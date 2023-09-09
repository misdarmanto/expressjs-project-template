import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { Op } from 'sequelize'
import { ResponseData } from '../../utilities/response'
import { type UserAttributes, UserModel } from '../../models/user'
import { requestChecker } from '../../utilities/requestCheker'
import { hashPassword } from '../../utilities/scure_password'
import { v4 as uuidv4 } from 'uuid'
import { generateAccessToken } from '../../utilities/jwt'

export const register = async (req: any, res: Response): Promise<any> => {
  const body = req.body as UserAttributes

  const emptyField = requestChecker({
    requireList: ['userName', 'userEmail', 'userPassword', 'userRole'],
    requestData: body
  })

  if (emptyField.length > 0) {
    const message = `invalid request parameter! require (${emptyField})`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.BAD_REQUEST).json(response)
  }

  try {
    const user = await UserModel.findOne({
      raw: true,
      where: {
        deleted: { [Op.eq]: 0 },
        userEmail: { [Op.eq]: body.userEmail }
      }
    })

    if (user != null) {
      const message = `Email ${user.userEmail} sudah terdaftar. Silahkan gunakan email lain.`
      const response = ResponseData.error(message)
      return res.status(StatusCodes.BAD_REQUEST).json(response)
    }

    body.userPassword = hashPassword(body.userPassword)
    body.userId = uuidv4()
    await UserModel.create(body)

    const token = generateAccessToken({
      user_id: body.userId,
      role: 'akademik'
    })

    const response = ResponseData.default
    response.data = { token }
    return res.status(StatusCodes.CREATED).json(response)
  } catch (error: any) {
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
