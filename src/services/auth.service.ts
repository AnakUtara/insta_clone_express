import { Request } from "express";
import { prisma } from "../lib/prisma";

class AuthService {
	async login(req: Request) {
		const { email_username } = req.body;
		const data = await prisma.user.findFirst({
			where: {
				OR: [{ username: email_username }, { email: email_username }],
			},
			select: {
				username: true,
				email: true,
				profile: true,
			},
		});
		return data;
	}
}

export default new AuthService();
