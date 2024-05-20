import { ReqUser as Request } from "../models/global.model";
import { prisma } from "../lib/prisma";
import { throwError, validateOrThrow } from "../utils/validator";
import { hashPassword } from "../lib/bcrypt";
import { Prisma, User } from "@prisma/client";

class UsersService {
	async getAll() {
		const data = await prisma.user.findMany();
		return data;
	}
	async getById(req: Request) {
		const { id } = req.params;
		const data = await prisma.user.findFirst({ where: { id } });
		return data;
	}
	async create(req: Request) {
		const { password } = req.body;
		const hashedPassword = await hashPassword(password);
		const data: Prisma.UserCreateInput = {
			...(req?.validUser as User),
			password: hashedPassword,
		};
		return await prisma.$transaction(async (prisma) => {
			try {
				await prisma.user.create({ data });
			} catch (error: unknown) {
				throwError(error);
			}
		});
	}
	async delete(req: Request) {
		const { id } = req.params;
		return await prisma.user.delete({ where: { id } });
	}
	async update(req: Request) {
		const { id } = req.params;
		return await prisma.user.update({
			where: { id },
			data: req.body,
		});
	}
	async getPostsById(req: Request) {
		const { id } = req.params;
		const data = await prisma.user.findMany({
			where: { id },
			select: {
				username: true,
				post: {
					select: {
						image: true,
						caption: true,
						status: true,
						created_at: true,
						updated_at: true,
					},
				},
			},
		});
		return data;
	}
}

export default new UsersService();
