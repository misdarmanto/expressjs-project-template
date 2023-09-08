import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Op } from "sequelize";
import { ResponseData, ResponseDataAttributes } from "../../utilities/response";
import { UserAttributes, UserModel } from "../../models/user";
import { requestChecker } from "../../utilities/requestCheker";

export const register = async (req: any, res: Response) => {
	const body = <UserAttributes>req.body;

	const emptyField = requestChecker({
		requireList: ["userName", "userEmail", "userPassword", "userRole"],
		requestData: body,
	});

	if (emptyField) {
		const message = `invalid request parameter! require (${emptyField})`;
		const response = <ResponseDataAttributes>ResponseData.error(message);
		return res.status(StatusCodes.BAD_REQUEST).json(response);
	}

	try {
		const user = await UserModel.findOne({
			raw: true,
			where: {
				deleted: { [Op.eq]: 0 },
				userEmail: { [Op.eq]: body.userEmail },
			},
		});

		if (user) {
			const message = `Email ${user.userEmail} sudah terdaftar. Silahkan gunakan email lain.`;
			const response = <ResponseDataAttributes>ResponseData.error(message);
			return res.status(StatusCodes.BAD_REQUEST).json(response);
		}

		// body.user_password = hashPassword(body.user_password);
		// body.user_id = uuidv4();
		// await UserModel.create(body);

		// const token = generateAccessToken({
		// 	user_id: body.user_id,
		// 	role: body.user_role,
		// });

		// const response = <ResponseDataAttributes>ResponseData.default;
		// response.data = { token };
		// return res.status(StatusCodes.CREATED).json(response);
	} catch (error: any) {
		const message = `unable to process request! error ${error.message}`;
		const response = <ResponseDataAttributes>ResponseData.error(message);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
	}
};
