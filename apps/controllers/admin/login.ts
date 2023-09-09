import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { Op } from 'sequelize'
import { type AdminAttributes, AdminModel } from '../../models/admin'
import { v4 as uuidv4 } from 'uuid'
import { requestChecker } from '../../utilities/requestCheker'
import { CONFIG } from '../../configs'
import { type SessionAttributes, SessionModel } from '../../models/session'

interface ISessionModel {
  adminId: string
  adminName: string
  adminEmail: string
  adminRole: 'admin' | 'superAdmin'
  session: string
  sessionExpiredOn: number
}

export const loginAdmin = async (req: any, res: Response): Promise<any> => {
  const requestBody = req.body as AdminAttributes

  const emptyField = requestChecker({
    requireList: ['adminEmail', 'adminPassword'],
    requestData: requestBody
  })

  if (emptyField.length > 0) {
    const message = `invalid request parameter! require (${emptyField})`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.BAD_REQUEST).json(response)
  }

  try {
    const checkAdmin = await AdminModel.findOne({
      raw: true,
      where: {
        deleted: { [Op.eq]: 0 },
        adminEmail: { [Op.eq]: requestBody.adminEmail }
      }
    })

    if (checkAdmin == null) {
      const message = 'User belum terdaftar.'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.UNAUTHORIZED).json(response)
    }

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const hashPassword = require('crypto')
      .createHash('sha1')
      .update(requestBody.adminPassword + CONFIG.secret.passwordEncryption)
      .digest('hex')

    if (hashPassword !== checkAdmin.adminPassword) {
      const message = 'Kombinasi email dan password tidak dikenal'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.UNAUTHORIZED).json(response)
    }

    const expired = new Date()
    expired.setHours(expired.getDate() + 10)

    const checkSession = await SessionModel.findOne({
      raw: true,
      where: {
        sessionId: { [Op.eq]: checkAdmin?.adminId },
        deleted: { [Op.eq]: 0 }
      }
    })

    const sessionData: SessionAttributes | any = {
      sessionId: uuidv4(),
      sessionAdminId: checkAdmin?.adminId,
      session: uuidv4(),
      sessionExpiredOn: expired.getTime(),
      deleted: 0
    }

    if (checkSession == null) {
      await SessionModel.create(sessionData)
    } else {
      await SessionModel.update(sessionData, {
        where: {
          sessionId: { [Op.eq]: checkAdmin?.adminId },
          deleted: { [Op.eq]: 0 }
        }
      })
    }

    const responseData: ISessionModel = {
      adminId: checkAdmin?.adminId,
      adminName: checkAdmin?.adminName,
      adminEmail: checkAdmin?.adminEmail,
      adminRole: checkAdmin.adminRole,
      session: sessionData.session,
      sessionExpiredOn: sessionData.sessionExpiredOn
    }

    const response = ResponseData.default
    response.data = responseData
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    console.log(error.message)
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
