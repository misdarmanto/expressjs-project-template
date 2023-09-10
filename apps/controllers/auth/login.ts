import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { Op } from 'sequelize'
import { ResponseData } from '../../utilities/response'
import { requestChecker } from '../../utilities/requestCheker'
import { type UserAttributes, UserModel } from '../../models/user'
import { hashPassword } from '../../utilities/scure_password'
import { generateAccessToken } from '../../utilities/jwt'

export const login = async (req: any, res: Response): Promise<any> => {
  const requestBody = req.body as UserAttributes

  const emptyField = requestChecker({
    requireList: ['userEmail', 'userPassword'],
    requestData: requestBody
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
        userEmail: { [Op.eq]: requestBody.userEmail }
      }
    })

    if (user == null) {
      const message =
        'Akun tidak ditemukan. Silahkan lakukan pendaftaran terlebih dahulu!'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.NOT_FOUND).json(response)
    }

    if (hashPassword(requestBody.userPassword) !== user.userPassword) {
      const message = 'kombinasi email dan password tidak ditemukan!'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.UNAUTHORIZED).json(response)
    }

    const token = generateAccessToken({
      userId: user.userId,
      role: 'superAdmin'
    })

    const response = ResponseData.default
    response.data = { token }
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
