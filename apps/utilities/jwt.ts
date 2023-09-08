import jwt from "jsonwebtoken";
import { CONFIG } from "../configs";

export interface JwtPayloadTypes {
	user_id: string;
	role: "mahasiswa" | "prodi" | "jurusan" | "akademik" | "biro";
}

// export function generateAccessToken(username: JwtPayloadTypes) {
// 	return jwt.sign(username, CONFIG.secret.token, { expiresIn: "1800s" });
// }

// export function verifyAccessToken(token: string) {
// 	try {
// 		return jwt.verify(token, CONFIG.secret.token);
// 	} catch {
// 		return false;
// 	}
// }
