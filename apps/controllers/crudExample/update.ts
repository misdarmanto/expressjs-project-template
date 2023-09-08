import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ResponseData, ResponseDataAttributes } from "../../utilities/response";
import { Op } from "sequelize";
import { requestChecker } from "../../utilities/requestCheker";
import { CrudExampleModel, CrudExampleAttributes } from "../../models/crudExample";

export const updateCrudExample = async (req: any, res: Response) => {
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

		const newData = <CrudExampleAttributes>{
			...(requestBody.crudExampleName && {
				crudExampleName: requestBody.crudExampleName,
			}),
		};

		await CrudExampleModel.update(newData, {
			where: {
				deleted: { [Op.eq]: 0 },
				crudExampleId: { [Op.eq]: requestBody.crudExampleId },
			},
		});

		const response = <ResponseDataAttributes>ResponseData.default;
		response.data = { message: "success" };
		return res.status(StatusCodes.OK).json(response);
	} catch (error: any) {
		const message = `unable to process request! error ${error.message}`;
		const response = <ResponseDataAttributes>ResponseData.error(message);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
	}
};
