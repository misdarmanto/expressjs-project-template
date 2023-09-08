import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ResponseData, ResponseDataAttributes } from "../../utilities/response";
import { requestChecker } from "../../utilities/requestCheker";
import { v4 as uuidv4 } from "uuid";
import { CrudExampleModel, CrudExampleAttributes } from "../../models/crudExample";

export const createCrudExample = async (req: any, res: Response) => {
	const requestBody = <CrudExampleAttributes>req.body;

	const emptyField = requestChecker({
		requireList: ["crudExampleName"],
		requestData: requestBody,
	});

	if (emptyField) {
		const message = `invalid request parameter! require (${emptyField})`;
		const response = <ResponseDataAttributes>ResponseData.error(message);
		return res.status(StatusCodes.BAD_REQUEST).json(response);
	}

	try {
		requestBody.crudExampleId = uuidv4();
		await CrudExampleModel.create(requestBody);

		const response = <ResponseDataAttributes>ResponseData.default;
		const result = { message: "create academic success" };
		response.data = result;
		return res.status(StatusCodes.CREATED).json(response);
	} catch (error: any) {
		const message = `unable to process request! error ${error.message}`;
		const response = <ResponseDataAttributes>ResponseData.error(message);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
	}
};
