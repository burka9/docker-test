import { NextFunction, Request, Response } from "express";
import logger from "../lib/logger";
import { goodRequest, unauthorized } from "../lib/response";
import { Database } from "../database";
import { User } from "../entity/user.entity";
import { Session } from "../entity/session.entity";
import { v4 as uuid } from "uuid";
import { base64ToString, stringToBase64 } from "../lib/string";

type AccessToken = {
	session: string;
	userId: string;
}

interface SessionControllerInterface {
	// checkAuthorization(): Response<any, Record<string, any>>;
	login(req: Request, res: Response): Promise<Response>;
	signup(req: Request, res: Response): Promise<Response | void>;
	validate(req: Request, res: Response): Promise<Response>;
	logout(req: Request, res: Response): Promise<Response>;
}

const userRepo = Database.getRepository(User)
const sessionRepo = Database.getRepository(Session)

export class SessionController implements SessionControllerInterface {
	static async checkAuthorization(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			const [bearer, access_token] = (req.headers.authorization as string).split(" ")

			if (bearer !== "Bearer" || !access_token) throw new Error("unauthorized")
			
			const { session, userId } = JSON.parse(base64ToString(access_token)) as AccessToken

			const user = await userRepo.findOneBy({ id: userId })

			if (!user) throw new Error("no user found")

			const sessions = await sessionRepo.findBy({
				user: { id: userId }
			})

			const validSession = sessions.find(s => s.compareToken(session))

			if (!validSession) throw new Error("invalid access token")

			res.locals.user = user
			res.locals.session = validSession

			return next()
		} catch (err: any) {
			logger.error(err.message)
		}

		return unauthorized(res)
	}

	static async GenerateSession(user: User): Promise<string> {
		const token = uuid()
		const session = new Session()
		await session.setToken(token)
		session.user = user

		await sessionRepo.save(session)

		return token
	}

	async login(req: Request, res: Response): Promise<Response> {
		const { username, password } = req.body
		console.log(req.body)

		const user = await userRepo.findOne({
			where: { username },
		})

		if (user && user.comparePassword(password)) {
			const token = await SessionController.GenerateSession(user)

			return goodRequest(res, ["access_token",
				stringToBase64(JSON.stringify({
					session: token,
					userId: user.id
				} as AccessToken))
			])
		}

		return unauthorized(res)
	}

	async signup(req: Request, res: Response): Promise<Response | void> {
		const { firstName, lastName, username, password } = req.body

		const user = new User()
		user.firstName = firstName
		user.lastName = lastName
		user.username = username
		await user.setPassword(password)

		await userRepo.save(user)

		res.redirect('./login', 307)
	}

	async validate(req: Request, res: Response): Promise<Response> {
		return goodRequest(res)
	}

	async logout(req: Request, res: Response): Promise<Response> {
		const session = res.locals.session as Session

		await sessionRepo.remove(session)

		return goodRequest(res)
	}
}

export default new SessionController()