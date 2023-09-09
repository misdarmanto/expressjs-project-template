import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ResponseData, ResponseDataAttributes } from "../../utilities/response";
import { Op } from "sequelize";
import { AdminAttributes, AdminModel } from "../../models/admin";
import { requestChecker } from "../../utilities/requestCheker";
import { isSuperAdmin } from "../../utilities/checkAuth";

export const removeAdmin = async (req: any, res: Response) => {
	const requestQuery = <AdminAttributes>req.query;
	const emptyField = requestChecker({
		requireList: ["x-user-id", "adminId"],
		requestData: { ...req.query, ...req.headers },
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

		const result = await AdminModel.update(
			{ deleted: 1 },
			{
				where: { adminId: { [Op.eq]: requestQuery.adminId } },
			}
		);
		return res.status(StatusCodes.OK).json(result);
	} catch (error: any) {
		console.log(error.message);
		const message = `unable to process request! error ${error.message}`;
		const response = <ResponseDataAttributes>ResponseData.error(message);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
	}
};
