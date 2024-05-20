import { NextFunction, Response } from "express";
import { prisma } from "../lib/prisma";
import { validateOrThrow } from "../utils/validator";
import { Prisma } from "@prisma/client";
import { TUser } from "../models/user.model";
import { registerSchema } from "../lib/joi";
import { compare } from "bcrypt";
import { ReqUser as Request } from "../models/global.model";
import { verify } from "jsonwebtoken";
import { SECRET_KEY } from "../config/config";

export async function checkRegisInputs(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const { username, email, fullname, password } = req.body;
		validateOrThrow(
			!username || !email || !fullname || !password,
			"All Fields Must Be Filled."
		);
		const { error, value } = registerSchema.validate(req.body);
		validateOrThrow(
			username.trim() === " " ||
				email.trim() === " " ||
				fullname.trim() === " " ||
				password.trim() === " ",
			"Empty spaces is not permitted."
		);
		if (error) throw error;
		req.validUser = value;
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
		const where: Prisma.UserWhereInput = {};
		if (username) where.username = username;
		if (email) where.email = email;
		const isExist = (await prisma.user.findFirst({
			where,
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
		const isUserExist = await prisma.user.findFirst({
			where: {
				OR: [{ username: email_username }, { email: email_username }],
			},
		});
		validateOrThrow(!isUserExist, "Invalid Username/Emai!");
		const comparePassword: boolean | null =
			isUserExist && (await compare(password, isUserExist.password));
		console.log(comparePassword);
		validateOrThrow(!comparePassword, "Invalid Password!");
		next();
	} catch (error) {
		next(error);
	}
}

export async function verifyToken(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const token = req.header("Authorization")?.replace("Bearer ", "");
		const verifiedUser = verify(token as string, SECRET_KEY);
		validateOrThrow(!token || !verifiedUser, "Unauthorized");
		req.user = verifiedUser as TUser;
		next();
	} catch (error) {
		next(error);
	}
}
