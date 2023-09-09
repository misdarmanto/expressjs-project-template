import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ResponseData, ResponseDataAttributes } from "../../utilities/response";
import { Op } from "sequelize";
import { AdminAttributes, AdminModel } from "../../models/admin";
import { v4 as uuidv4 } from "uuid";
import { requestChecker } from "../../utilities/requestCheker";
import { CONFIG } from "../../configs";
import { SessionAttributes, SessionModel } from "../../models/session";

interface ISessionModel {
	adminId: string;
	adminName: string;
	adminEmail: string;
	adminRole: "admin" | "superAdmin";
	session: string;
	sessionExpiredOn: number;
}

export const loginAdmin = async (req: any, res: Response) => {
	const requestBody = <AdminAttributes>req.body;

	const emptyField = requestChecker({
		requireList: ["adminEmail", "adminPassword"],
		requestData: requestBody,
	});

	if (emptyField) {
		const message = `invalid request parameter! require (${emptyField})`;
		const response = <ResponseDataAttributes>ResponseData.error(message);
		return res.status(StatusCodes.BAD_REQUEST).json(response);
	}

	try {
		const checkAdmin = await AdminModel.findOne({
			raw: true,
			where: {
				deleted: { [Op.eq]: 0 },
				adminEmail: { [Op.eq]: requestBody.adminEmail },
			},
		});

		if (!checkAdmin) {
			const message = `User belum terdaftar.`;
			const response = <ResponseDataAttributes>ResponseData.error(message);
			return res.status(StatusCodes.UNAUTHORIZED).json(response);
		}

		const hashPassword = require("crypto")
			.createHash("sha1")
			.update(requestBody.adminPassword + CONFIG.secret.passwordEncryption)
			.digest("hex");

		if (hashPassword !== checkAdmin.adminPassword) {
			const message = `Kombinasi email dan password tidak dikenal`;
			const response = <ResponseDataAttributes>ResponseData.error(message);
			return res.status(StatusCodes.UNAUTHORIZED).json(response);
		}

		let expired = new Date();
		expired.setHours(expired.getDate() + 10);

		const checkSession = await SessionModel.findOne({
			raw: true,
			where: {
				sessionId: { [Op.eq]: checkAdmin?.adminId },
				deleted: { [Op.eq]: 0 },
			},
		});

		const sessionData = <SessionAttributes>{
			sessionId: uuidv4(),
			sessionAdminId: checkAdmin?.adminId,
			session: uuidv4(),
			sessionExpiredOn: expired.getTime(),
			deleted: 0,
		};

		if (!checkSession) {
			await SessionModel.create(sessionData);
		} else {
			await SessionModel.update(sessionData, {
				where: {
					sessionId: { [Op.eq]: checkAdmin?.adminId },
					deleted: { [Op.eq]: 0 },
				},
			});
		}

		const responseData: ISessionModel = {
			adminId: checkAdmin?.adminId,
			adminName: checkAdmin?.adminName,
			adminEmail: checkAdmin?.adminEmail,
			adminRole: checkAdmin.adminRole,
			session: sessionData.session,
			sessionExpiredOn: sessionData.sessionExpiredOn,
		};

		const response = <ResponseDataAttributes>ResponseData.default;
		response.data = responseData;
		return res.status(StatusCodes.OK).json(response);
	} catch (error: any) {
		console.log(error.message);
		const message = `unable to process request! error ${error.message}`;
		const response = <ResponseDataAttributes>ResponseData.error(message);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
	}
};
