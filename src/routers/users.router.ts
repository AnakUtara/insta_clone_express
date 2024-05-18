import profileController from "../controllers/profile.controller";
import usersController from "../controllers/users.controller";
import {
	checkUpdateUserForm,
	checkUserExistById,
} from "../middlewares/users.middleware";
import { EntityRouter } from "./entity.router";

class UsersRouter extends EntityRouter {
	constructor() {
		super();
		this.initRouter();
	}
	private initRouter() {
		this.router.get("/", usersController.getAll.bind(usersController));
		this.router.get(
			"/profile",
			profileController.getAll.bind(profileController)
		);
		this.router.post(
			"/profile",
			profileController.create.bind(profileController)
		);
		this.router.patch(
			"/:id",
			checkUpdateUserForm,
			checkUserExistById,
			usersController.update.bind(usersController)
		);
		this.router.delete(
			"/:id",
			checkUserExistById,
			usersController.delete.bind(usersController)
		);
		this.router.get(
			"/:id",
			checkUserExistById,
			usersController.getById.bind(usersController)
		);
		this.router.get(
			"/:id/posts",
			checkUserExistById,
			usersController.getPostsById.bind(usersController)
		);
		this.router.patch(
			"/:id/profile",
			checkUserExistById,
			profileController.update.bind(profileController)
		);
		this.router.get(
			"/:id/profile",
			checkUserExistById,
			profileController.getById.bind(profileController)
		);
	}
}

export default new UsersRouter();
