import { Application } from "express";
import { RouteConfig } from "../lib/route.config";
import { SessionController } from "../controller/session.controller";
import userController from "../controller/user.controller";

export class UserRoute extends RouteConfig {
	constructor(app: Application) {
		super(app, "User Route")
	}

	registerRoute(): void {
		this.app.use('/api/user', this.router)
	}

	configureRoutes(): void {
		this.router.route('/user-info')
			.get(SessionController.checkAuthorization, userController.getUserInfo)
	}
}