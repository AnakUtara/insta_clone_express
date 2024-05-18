import { NextFunction, Request, Response } from "express";
import { validateOrThrow } from "../utils/validator";
import { postSchema } from "../lib/joi";
import { prisma } from "../lib/prisma";

export async function checkPostInput(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const { image, caption, user_id, status } = req.body;
		validateOrThrow(
			!image || !caption || !user_id || !status,
			"Must fill all fields."
		);
		const { error } = postSchema.validate(caption, user_id);
		if (error) throw error;
		next();
	} catch (error) {
		next(error);
	}
}

export async function checkPostExistById(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const { id } = req.params;
		const isExist = (await prisma.post.findFirst({
			where: { id: Number(id) },
			select: { id: true },
		})) as { id: number };
		validateOrThrow(!isExist, "Post does not exist.");
		next();
	} catch (error) {
		next(error);
	}
}

export async function checkUpdatePostForm(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const { error } = postSchema.validate(req.body);
		if (error) throw error;
		validateOrThrow(!req.body, "Fill al least one field to update");
		next();
	} catch (error) {
		next(error);
	}
}
