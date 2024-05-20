import { Request } from "express";
import { TUser } from "./user.model";

export interface ReqUser extends Request {
	user?: TUser;
	validUser?: TUser;
}
