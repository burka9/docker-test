import { Request, Response } from "express";
import { Database } from "../database";
import { User } from "../entity/user.entity";
import { goodRequest } from "../lib/response";

interface UserControllerInterface {
	getUserInfo(req: Request, res: Response): Promise<Response>;
}

const userRepo = Database.getRepository(User)


export class UserController implements UserControllerInterface {
	async getUserInfo(req: Request, res: Response): Promise<Response> {
		const user = res.locals.user as Partial<User>

		delete user.password

		return goodRequest(res, ["user", user])
	}
}

export default new UserController()