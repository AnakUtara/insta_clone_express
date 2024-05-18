import { NextFunction, Request, Response } from "express";
import authService from "../services/auth.service";

export class AuthController {
	async login(req: Request, res: Response, next: NextFunction) {
		try {
			const result = await authService.login(req);
			res.send({ message: "login success", data: result });
		} catch (error) {
			next(error);
		}
	}
}
