import { NextFunction, Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { validateOrThrow } from "../utils/validator";
import { registerSchema } from "../lib/joi";

export async function checkUserExistById(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const { id } = req.params;
		const isExist = (await prisma.user.findFirst({
			where: { id: Number(id) },
			select: { id: true },
		})) as { id: number };
		validateOrThrow(!isExist, "User does not exist.");
		next();
	} catch (error) {
		next(error);
	}
}

export async function checkUpdateUserForm(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const { error } = registerSchema.validate(req.body);
		if (error) throw error;
		validateOrThrow(!req.body, "Fill at least one field to update");
		next();
	} catch (error) {
		next(error);
	}
}
