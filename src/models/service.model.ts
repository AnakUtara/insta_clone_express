import { Request } from "express";
import { TProfile, TUser } from "./user.model";
import { TPost, TUserPost } from "./post.model";

export interface IService extends ICustomService {
	getAll: () => Promise<TUser[] | TProfile[] | TPost[] | TPost[] | TUserPost[]>;
	getById: (
		req: Request
	) => Promise<TUser | TProfile | TPost | TUserPost | null>;
	create: (
		req: Request
	) => Promise<void | TUser | TProfile | TPost | TUserPost>;
	delete: (req: Request) => Promise<TUser | TProfile | TPost | TUserPost>;
	update: (req: Request) => Promise<TUser | TProfile | TPost | TUserPost>;
}

interface ICustomService {
	getPostsById?: (req: Request) => Promise<TUserPost[]> | undefined;
}
