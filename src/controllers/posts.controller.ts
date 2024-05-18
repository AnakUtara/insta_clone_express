import { IService } from "../models/service.model";
import postsService from "../services/posts.service";
import { EntityController } from "./entity.controller";

class PostsController extends EntityController {
	constructor(service: IService) {
		super(service);
	}
}

export default new PostsController(postsService);
