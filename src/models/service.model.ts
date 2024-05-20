// import { Request } from "express";
import { ReqUser as Request } from "../models/global.model";
import { TUser } from "./user.model";
import { TPost, TUserPost } from "./post.model";

export interface IService extends ICustomService {
	getAll: () => Promise<TUser[] | TPost[] | TUserPost[]>;
	getById: (req: Request) => Promise<TUser | TPost | TUserPost | null>;
	create: (req: Request) => Promise<void | TUser | TPost | TUserPost>;
	delete: (req: Request) => Promise<TUser | TPost | TUserPost>;
	update: (req: Request) => Promise<TUser | TPost | TUserPost>;
}

interface ICustomService {
	getPostsById?: (req: Request) => Promise<TUserPost[]> | undefined;
}
