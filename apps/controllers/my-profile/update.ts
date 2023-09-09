import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { Op } from 'sequelize'
import { type AdminAttributes, AdminModel } from '../../models/admin'
import { requestChecker } from '../../utilities/requestCheker'
import { CONFIG } from '../../configs'

export const updateMyProfile = async (req: any, res: Response): Promise<any> => {
  const requestBody = req.body as AdminAttributes
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
    if ('adminPassword' in requestBody) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      requestBody.adminPassword = require('crypto')
        .createHash('sha1')
        .update(requestBody.adminPassword + CONFIG.secret.passwordEncryption)
        .digest('hex')
    }

    const newData: AdminAttributes | any = {
      ...(requestBody.adminName.length > 0 && {
        adminName: requestBody.adminName
      }),
      ...(requestBody.adminEmail.length > 0 && {
        adminEmail: requestBody.adminEmail
      }),
      ...(requestBody.adminPassword.length > 0 && {
        adminPassword: requestBody.adminPassword
      }),
      ...(requestBody.adminRole.length > 0 && {
        adminRole: requestBody.adminRole
      })
    }

    await AdminModel.update(newData, {
      where: {
        deleted: { [Op.eq]: 0 },
        adminId: { [Op.eq]: req.header('x-user-id') }
      }
    })

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
