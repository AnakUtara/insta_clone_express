import postsController from "../controllers/posts.controller";
import { verifyToken } from "../middlewares/auth.middleware";
import {
	checkPostExistById,
	checkPostInput,
	checkUpdatePostForm,
} from "../middlewares/posts.middleware";
import { EntityRouter } from "./entity.router";

class PostsRouter extends EntityRouter {
	constructor() {
		super();
		this.initRouter();
	}
	private initRouter() {
		this.router.get("/", postsController.getAll.bind(postsController));
		this.router.post(
			"/",
			verifyToken,
			checkPostInput,
			postsController.create.bind(postsController)
		);
		this.router.patch(
			"/:id",
			checkUpdatePostForm,
			checkPostExistById,
			postsController.update.bind(postsController)
		);
		this.router.delete(
			"/:id",
			checkPostExistById,
			postsController.delete.bind(postsController)
		);
		this.router.get(
			"/:id",
			checkPostExistById,
			postsController.getById.bind(postsController)
		);
	}
}

export default new PostsRouter();
