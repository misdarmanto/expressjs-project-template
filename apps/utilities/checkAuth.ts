import { Op } from "sequelize";
import { AdminModel } from "../models/admin";

export const isSuperAdmin = async ({ adminId }: { adminId: string }) => {
	try {
		const checkAdmin = await AdminModel.findOne({
			raw: true,
			where: {
				deleted: { [Op.eq]: 0 },
				adminId: { [Op.eq]: adminId },
				adminRole: { [Op.eq]: "superAdmin" },
			},
		});

		if (checkAdmin) {
			return checkAdmin;
		}
		return false;
	} catch (error: any) {
		throw error;
	}
};
