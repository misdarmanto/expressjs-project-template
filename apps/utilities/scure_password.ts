import { CONFIG } from "../configs";

export function hashPassword(password: string) {
	return require("crypto")
		.createHash("sha1")
		.update(password + CONFIG.secret.passwordEncryption)
		.digest("hex");
}
