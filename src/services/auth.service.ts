import { prisma } from "../lib/prisma";
import { TUser } from "../models/user.model";
import { createToken } from "../lib/jwt";
import { ReqUser as Request } from "../models/global.model";

class AuthService {
	async login(req: Request) {
		const { email_username } = req.body;
		const data = (await prisma.user.findFirst({
			where: {
				OR: [{ username: email_username }, { email: email_username }],
			},
		})) as TUser;
		req.user = data;
		delete data.password;
		return createToken(data, "1hr");
	}
}

export default new AuthService();
