import { Request } from "express";
import { prisma } from "../lib/prisma";
import { throwError } from "../utils/validator";

class UsersService {
	async getAll() {
		const data = await prisma.user.findMany();
		return data;
	}
	async getById(req: Request) {
		const { id } = req.params;
		const data = await prisma.user.findFirst({ where: { id: Number(id) } });
		return data;
	}
	async create(req: Request) {
		return await prisma.$transaction(async (prisma) => {
			try {
				await prisma.user.create({ data: req.body });
			} catch (error: unknown) {
				throwError(error);
			}
		});
	}
	async delete(req: Request) {
		const { id } = req.params;
		return await prisma.user.delete({ where: { id: Number(id) } });
	}
	async update(req: Request) {
		const { id } = req.params;
		return await prisma.user.update({
			where: { id: Number(id) },
			data: req.body,
		});
	}
	async getPostsById(req: Request) {
		const { id } = req.params;
		const data = await prisma.user.findMany({
			where: { id: Number(id) },
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
