import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ResponseData, ResponseDataAttributes } from "../../utilities/response";
import { Op } from "sequelize";
import { AdminAttributes, AdminModel } from "../../models/admin";
import { requestChecker } from "../../utilities/requestCheker";
import { isSuperAdmin } from "../../utilities/checkAuth";
import { CONFIG } from "../../configs";

export const updateAdmin = async (req: any, res: Response) => {
	const requestBody = <AdminAttributes>req.body;
	const emptyField = requestChecker({
		requireList: ["x-user-id"],
		requestData: req.headers,
	});

	if (emptyField) {
		const message = `invalid request parameter! require (${emptyField})`;
		const response = <ResponseDataAttributes>ResponseData.error(message);
		return res.status(StatusCodes.BAD_REQUEST).json(response);
	}

	try {
		const checkCurrentAdmin = await isSuperAdmin({
			adminId: req.header("x-user-id"),
		});

		if (!checkCurrentAdmin) {
			const message = `access denied!`;
			const response = <ResponseDataAttributes>ResponseData.error(message);
			return res.status(StatusCodes.UNAUTHORIZED).json(response);
		}

		if ("adminPassword" in requestBody) {
			requestBody.adminPassword = require("crypto")
				.createHash("sha1")
				.update(requestBody.adminPassword + CONFIG.secret.passwordEncryption)
				.digest("hex");
		}

		const newData = <AdminAttributes>{
			...(requestBody.adminName && {
				adminName: requestBody.adminName,
			}),
			...(requestBody.adminEmail && {
				adminEmail: requestBody.adminEmail,
			}),
			...(requestBody.adminPassword && {
				adminPassword: requestBody.adminPassword,
			}),
			...(requestBody.adminRole && {
				adminRole: requestBody.adminRole,
			}),
		};

		await AdminModel.update(newData, {
			where: {
				deleted: { [Op.eq]: 0 },
				adminId: { [Op.eq]: requestBody.adminId },
			},
		});

		const response = <ResponseDataAttributes>ResponseData.default;
		response.data = { message: "success" };
		return res.status(StatusCodes.OK).json(response);
	} catch (error: any) {
		console.log(error.message);
		const message = `unable to process request! error ${error.message}`;
		const response = <ResponseDataAttributes>ResponseData.error(message);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
	}
};
