import { Application } from "express";
import { RouteConfig } from "../lib/route.config";
import sessionController, { SessionController } from "../controller/session.controller";

export class SessionRoute extends RouteConfig {
	constructor(app: Application) {
		super(app, "Session Route")
	}

	registerRoute(): void {
		this.app.use('/api/session', this.router)
	}

	configureRoutes(): void {
		this.router.route('/login')
			.post(sessionController.login)

		this.router.route('/signup')
			.post(sessionController.signup)

		this.router.route('/validate')
			.post(SessionController.checkAuthorization, sessionController.validate)

		this.router.route('/logout')
			.post(SessionController.checkAuthorization, sessionController.logout)
	}
}