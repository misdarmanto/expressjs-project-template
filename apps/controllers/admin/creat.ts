import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { Op } from 'sequelize'
import { type AdminAttributes, AdminModel } from '../../models/admin'
import { CONFIG } from '../../configs'
import { v4 as uuidv4 } from 'uuid'
import { requestChecker } from '../../utilities/requestCheker'
import { isSuperAdmin } from '../../utilities/checkAuth'

export const createAdmin = async (req: any, res: Response): Promise<any> => {
  const requestBody = req.body as AdminAttributes

  const emptyField = requestChecker({
    requireList: ['x-user-id', 'adminName', 'adminEmail', 'adminPassword'],
    requestData: { ...requestBody, ...req.headers }
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

    if (checkCurrentAdmin !== null) {
      const message = 'access denied!'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.UNAUTHORIZED).json(response)
    }

    const checkIsUserAlreadyExis = await AdminModel.findOne({
      raw: true,
      where: {
        deleted: { [Op.eq]: 0 },
        adminEmail: { [Op.eq]: requestBody.adminEmail }
      }
    })

    if (checkIsUserAlreadyExis?.adminEmail != null) {
      const message = 'Email sudah terdatar. Silahkan gunakan email lain.'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.UNAUTHORIZED).json(response)
    }

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const hashPassword = require('crypto')
      .createHash('sha1')
      .update(requestBody.adminPassword + CONFIG.secret.passwordEncryption)
      .digest('hex')

    requestBody.adminId = uuidv4()
    requestBody.adminPassword = hashPassword
    requestBody.adminCreatedBy = ''

    await AdminModel.create(requestBody)
    const response = ResponseData.default
    response.data = { message: 'success' }
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    console.log(error.message)
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
