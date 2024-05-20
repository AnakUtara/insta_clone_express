import { NextFunction, Response } from "express";
import authService from "../services/auth.service";
import { ReqUser as Request } from "../models/global.model";

export class AuthController {
	async login(req: Request, res: Response, next: NextFunction) {
		try {
			const token = await authService.login(req);
			res.cookie("auth", token).send({ message: "login success", token });
		} catch (error) {
			next(error);
		}
	}
}
