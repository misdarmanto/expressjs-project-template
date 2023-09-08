import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ResponseData, ResponseDataAttributes } from "../../utilities/response";
import { Op } from "sequelize";
import { requestChecker } from "../../utilities/requestCheker";
import { SemesterAttributes, SemesterModel } from "../../models/semester";

export const remove = async (req: any, res: Response) => {
	const body = <SemesterAttributes>req.body;

	const emptyField = requestChecker({
		requireList: ["semesterId"],
		requestData: body,
	});

	if (emptyField) {
		const message = `invalid request parameter! require (${emptyField})`;
		const response = <ResponseDataAttributes>ResponseData.error(message);
		return res.status(StatusCodes.BAD_REQUEST).json(response);
	}

	try {
		const semesterCheck = await SemesterModel.findOne({
			where: {
				deleted: { [Op.eq]: 0 },
				semesterId: { [Op.eq]: req.body.semesterId },
			},
		});

		if (!semesterCheck) {
			const message = `not found!`;
			const response = <ResponseDataAttributes>ResponseData.error(message);
			return res.status(StatusCodes.NOT_FOUND).json(response);
		}

		await SemesterModel.update(
			{ deleted: 1 },
			{
				where: {
					semesterId: { [Op.eq]: body.semesterId },
				},
			}
		);

		const response = <ResponseDataAttributes>ResponseData.default;
		response.data = { message: "success" };
		return res.status(StatusCodes.OK).json(response);
	} catch (error: any) {
		const message = `unable to process request! error ${error.message}`;
		const response = <ResponseDataAttributes>ResponseData.error(message);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
	}
};
