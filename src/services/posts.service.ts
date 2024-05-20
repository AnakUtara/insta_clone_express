import { prisma } from "../lib/prisma";
import { throwError } from "../utils/validator";
import { Prisma } from "@prisma/client";
import { ReqUser as Request } from "../models/global.model";
class PostsService {
	async getAll() {
		const data = await prisma.post.findMany({
			orderBy: [{ created_at: "desc" }],
		});
		return data;
	}
	async getById(req: Request) {
		const { id } = req.params;
		const data = await prisma.post.findFirst({ where: { id: Number(id) } });
		return data;
	}
	async create(req: Request) {
		return await prisma.$transaction(async (prisma) => {
			try {
				const { image, caption } = req.body;
				const data: Prisma.PostCreateInput = {
					image,
					caption,
					user: {
						connect: {
							id: req.user?.id,
						},
					},
				};
				await prisma.post.create({ data });
			} catch (error: unknown) {
				throwError(error);
			}
		});
	}
	async delete(req: Request) {
		const { id } = req.params;
		return await prisma.post.delete({ where: { id: Number(id) } });
	}
	async update(req: Request) {
		const { id } = req.params;
		return await prisma.post.update({
			where: { id: Number(id) },
			data: req.body,
		});
	}
}

export default new PostsService();
