import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { Op } from 'sequelize'
import { requestChecker } from '../../utilities/requestCheker'
import { AdminModel } from '../../models/admin'

export const findMyProfile = async (req: any, res: Response): Promise<any> => {
  const emptyField = requestChecker({
    requireList: ['x-user-id'],
    requestData: req.headers
  })

  if (emptyField.length > 0) {
    const message = `invalid request parameter! require (${emptyField})`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.BAD_REQUEST).json(response)
  }

  try {
    const admin = await AdminModel.findOne({
      where: {
        deleted: { [Op.eq]: 0 },
        adminId: { [Op.eq]: req.header('x-user-id') }
      },
      attributes: [
        'adminId',
        'adminName',
        'adminEmail',
        'adminRole',
        'createdAt',
        'updatedAt'
      ]
    })

    if (admin == null) {
      const message = 'user not found!'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.NOT_FOUND).json(response)
    }

    const response = ResponseData.default
    response.data = admin
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    console.log(error.message)
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
