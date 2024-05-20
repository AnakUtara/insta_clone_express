import { AuthController } from "../controllers/auth.controller";
import usersController from "../controllers/users.controller";
import { authenticate } from "../middlewares/auth.middleware";
import {
	checkExistingUser,
	checkRegisInputs,
} from "../middlewares/auth.middleware";
import { EntityRouter } from "./entity.router";

class AuthRouter extends EntityRouter {
	authController: AuthController;
	constructor() {
		super();
		this.authController = new AuthController();
		this.initRouter();
	}
	private initRouter() {
		this.router.post("/v1", authenticate, this.authController.login);
		this.router.post(
			"/v2",
			checkRegisInputs,
			checkExistingUser,
			usersController.create.bind(usersController)
		);
	}
}

export default new AuthRouter();
