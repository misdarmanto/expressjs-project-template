import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ResponseData, ResponseDataAttributes } from "../../utilities/response";
import { requestChecker } from "../../utilities/requestCheker";
import { v4 as uuidv4 } from "uuid";
import { AcademicAttributes, AcademicModel } from "../../models/academic";

export const create = async (req: any, res: Response) => {
	const requestBody = <AcademicAttributes>req.body;

	const emptyField = requestChecker({
		requireList: ["academicName", "academicEmail"],
		requestData: requestBody,
	});

	if (emptyField) {
		const message = `invalid request parameter! require (${emptyField})`;
		const response = <ResponseDataAttributes>ResponseData.error(message);
		return res.status(StatusCodes.BAD_REQUEST).json(response);
	}

	try {
		requestBody.academicId = uuidv4();
		await AcademicModel.create(requestBody);
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
