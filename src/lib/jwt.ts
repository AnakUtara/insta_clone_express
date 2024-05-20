import { sign } from "jsonwebtoken";
import { SECRET_KEY } from "../config/config";
export function createToken(payload: any, expiresIn: string) {
	return sign(payload, SECRET_KEY, { expiresIn });
}
