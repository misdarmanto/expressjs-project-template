import { type NextFunction, type Request, type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../utilities/response'
import { CONFIG } from '../configs'

export const ipBlackList = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    if (CONFIG.ipBlackList.indexOf(req.ip) > -1) {
      const message = 'access denied'
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
