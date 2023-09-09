import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { Op } from 'sequelize'
import { AdminModel } from '../../models/admin'
import { Pagination } from '../../utilities/pagination'
import { requestChecker } from '../../utilities/requestCheker'
import { isSuperAdmin } from '../../utilities/checkAuth'

export const findAllAdmin = async (req: any, res: Response): Promise<any> => {
  try {
    const page = new Pagination(
      parseInt(req.query.page) ?? 0,
      parseInt(req.query.size) ?? 10
    )
    const users = await AdminModel.findAndCountAll({
      where: {
        deleted: { [Op.eq]: 0 },
        adminId: { [Op.not]: req.header('x-user-id') },
        ...(Boolean(req.query.search) && {
          [Op.or]: [
            { adminName: { [Op.like]: `%${req.query.search}%` } },
            { adminEmail: { [Op.like]: `%${req.query.search}%` } }
          ]
        })
      },
      attributes: [
        'adminId',
        'adminName',
        'adminEmail',
        'adminRole',
        'createdAt',
        'updatedAt'
      ],
      order: [['id', 'desc']],
      ...(req.query.pagination === 'true' && {
        limit: page.limit,
        offset: page.offset
      })
    })
    const response = ResponseData.default
    response.data = page.data(users)
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    console.log(error.message)
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}

export const findOneAdmin = async (req: any, res: Response): Promise<any> => {
  const emptyField = requestChecker({
    requireList: ['adminId', 'x-user-id'],
    requestData: { ...req.params, ...req.headers }
  })

  if (emptyField.length > 0) {
    const message = `invalid request parameter! require (${emptyField})`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.BAD_REQUEST).json(response)
  }

  try {
    const checkCurrentAdmin = await isSuperAdmin({
      adminId: req.header('x-user-id')
    })

    if (!checkCurrentAdmin) {
      const message = 'access denied!'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.UNAUTHORIZED).json(response)
    }

    const admin = await AdminModel.findOne({
      where: {
        deleted: { [Op.eq]: 0 },
        adminId: { [Op.eq]: req.params.adminId }
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
      const message = 'admin not found!'
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
