import { Op } from 'sequelize'
import { AdminModel } from '../models/admin'

interface IsSuperAdminType {
  adminId: string
}

export const isSuperAdmin = async ({ adminId }: IsSuperAdminType): Promise<boolean> => {
  const checkAdmin = await AdminModel.findOne({
    raw: true,
    where: {
      deleted: { [Op.eq]: 0 },
      adminId: { [Op.eq]: adminId },
      adminRole: { [Op.eq]: 'superAdmin' }
    }
  })
  return checkAdmin != null
}
