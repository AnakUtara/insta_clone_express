import { IService } from "../models/service.model";
import usersService from "../services/users.service";
import { EntityController } from "./entity.controller";
import { Request, Response, NextFunction } from "express";

class UsersController extends EntityController {
	constructor(service: IService) {
		super(service);
	}
	async getPostsById(req: Request, res: Response, next: NextFunction) {
		try {
			if (!this.service.getPostsById) throw new Error("");
			const result = await this.service.getPostsById(req);
			res.send({ message: "fetch posts from user id", data: result });
		} catch (error) {
			next(error);
		}
	}
}

export default new UsersController(usersService);
