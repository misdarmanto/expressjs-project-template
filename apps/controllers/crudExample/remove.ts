import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ResponseData, ResponseDataAttributes } from "../../utilities/response";
import { Op } from "sequelize";
import { requestChecker } from "../../utilities/requestCheker";
import { CrudExampleAttributes, CrudExampleModel } from "../../models/crudExample";

export const removeCrudExample = async (req: any, res: Response) => {
	const requestBody = <CrudExampleAttributes>req.body;

	const emptyField = requestChecker({
		requireList: ["crudExampleId"],
		requestData: requestBody,
	});

	if (emptyField) {
		const message = `invalid request parameter! require (${emptyField})`;
		const response = <ResponseDataAttributes>ResponseData.error(message);
		return res.status(StatusCodes.BAD_REQUEST).json(response);
	}

	try {
		const result = await CrudExampleModel.findOne({
			where: {
				deleted: { [Op.eq]: 0 },
				crudExampleId: { [Op.eq]: requestBody.crudExampleId },
			},
		});

		if (!result) {
			const message = `not found!`;
			const response = <ResponseDataAttributes>ResponseData.error(message);
			return res.status(StatusCodes.NOT_FOUND).json(response);
		}

		result.deleted = 1;
		result.save();

		const response = <ResponseDataAttributes>ResponseData.default;
		response.data = { message: "success" };
		return res.status(StatusCodes.OK).json(response);
	} catch (error: any) {
		const message = `unable to process request! error ${error.message}`;
		const response = <ResponseDataAttributes>ResponseData.error(message);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
	}
};
