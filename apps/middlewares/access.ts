import { type NextFunction, type Request, type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../utilities/response'
import { CONFIG } from '../configs'

export const useAuthorization = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  try {
    if (
      req.header('authorization') == null ||
      // eslint-disable-next-line @typescript-eslint/prefer-includes
      req.header('authorization')?.indexOf('Basic ') === -1
    ) {
      const message = 'Missing Authorization.'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.BAD_REQUEST).json(response)
    }
    const base64Credentials = req.header('authorization')?.split(' ')[1]
    const credentials = Buffer.from(base64Credentials ?? ':', 'base64').toString('ascii')
    const [username, password] = credentials.split(':')

    if (
      username !== CONFIG.authorization.username ||
      password !== CONFIG.authorization.passsword
    ) {
      const message = 'Invalid Authorization.'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.UNAUTHORIZED).json(response)
    }
    next()
  } catch (error: any) {
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
