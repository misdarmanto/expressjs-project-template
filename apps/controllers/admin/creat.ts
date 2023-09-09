import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ResponseData, ResponseDataAttributes } from "../../utilities/response";
import { Op } from "sequelize";
import { AdminAttributes, AdminModel } from "../../models/admin";
import { CONFIG } from "../../configs";
import { v4 as uuidv4 } from "uuid";
import { requestChecker } from "../../utilities/requestCheker";
import { isSuperAdmin } from "../../utilities/checkAuth";

export const createAdmin = async (req: any, res: Response) => {
	const requestBody = <AdminAttributes>req.body;

	const emptyField = requestChecker({
		requireList: ["x-user-id", "adminName", "adminEmail", "adminPassword"],
		requestData: { ...requestBody, ...req.headers },
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
			const message = `access denied! s`;
			const response = <ResponseDataAttributes>ResponseData.error(message);
			return res.status(StatusCodes.UNAUTHORIZED).json(response);
		}

		const checkIsUserAlreadyExis = await AdminModel.findOne({
			raw: true,
			where: {
				deleted: { [Op.eq]: 0 },
				adminEmail: { [Op.eq]: requestBody.adminEmail },
			},
		});

		if (checkIsUserAlreadyExis?.adminEmail) {
			const message = `Email sudah terdatar. Silahkan gunakan email lain.`;
			const response = <ResponseDataAttributes>ResponseData.error(message);
			return res.status(StatusCodes.UNAUTHORIZED).json(response);
		}

		const hashPassword = require("crypto")
			.createHash("sha1")
			.update(requestBody.adminPassword + CONFIG.secret.passwordEncryption)
			.digest("hex");

		requestBody.adminId = uuidv4();
		requestBody.adminPassword = hashPassword;
		requestBody.adminCreatedBy = checkCurrentAdmin.adminName;

		await AdminModel.create(requestBody);
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
