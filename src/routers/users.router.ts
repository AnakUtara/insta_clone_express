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
	}
}

export default new UsersRouter();
