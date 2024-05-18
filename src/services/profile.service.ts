import { Request } from "express";
import { prisma } from "../lib/prisma";
import { throwError } from "../utils/validator";

class ProfileService {
	async getAll() {
		const data = await prisma.profile.findMany();
		return data;
	}
	async getById(req: Request) {
		const { id } = req.params;
		const data = await prisma.profile.findFirst({ where: { id: Number(id) } });
		return data;
	}
	async create(req: Request) {
		return await prisma.$transaction(async (prisma) => {
			try {
				await prisma.profile.create({ data: req.body });
			} catch (error: unknown) {
				throwError(error);
			}
		});
	}
	async update(req: Request) {
		const { id } = req.params;
		return await prisma.profile.update({
			where: { id: Number(id) },
			data: req.body,
		});
	}
	async delete(req: Request) {
		const { id } = req.params;
		return await prisma.profile.delete({ where: { id: Number(id) } });
	}
}

export default new ProfileService();
