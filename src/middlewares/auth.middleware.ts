import { NextFunction, Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { validateOrThrow } from "../utils/validator";
import { Prisma } from "@prisma/client";
import { TUser } from "../models/user.model";
import { registerSchema } from "../lib/joi";

export async function checkRegisInputs(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const { username, email, password } = req.body;
		validateOrThrow(
			!username || !email || !password,
			"All Fields Must Be Filled."
		);
		const { error } = registerSchema.validate(req.body);
		validateOrThrow(
			username.trim() === " " ||
				email.trim() === " " ||
				password.trim() === " ",
			"Empty spaces is not permitted."
		);
		if (error) throw error;
		next();
	} catch (error) {
		next(error);
	}
}

export async function checkExistingUser(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const { username, email } = req.body;
		const filter: Prisma.UserWhereInput = {};
		if (username) filter.username = username;
		if (email) filter.email = email;
		const isExist = (await prisma.user.findFirst({
			where: filter,
		})) as TUser;
		validateOrThrow(isExist !== null, "User/Email already exist.");
		next();
	} catch (error) {
		next(error);
	}
}

export async function authenticate(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const { email_username, password } = req.body;
		const auth = await prisma.user.findFirst({
			where: {
				OR: [{ username: email_username }, { email: email_username }],
				password,
			},
		});
		validateOrThrow(!auth, "Invalid Username/Email & Password!");
		next();
	} catch (error) {
		next(error);
	}
}
