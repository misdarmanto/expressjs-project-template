import type { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../utilities/response'

export const index = async (req: Request, res: Response): Promise<any> => {
  try {
    const data = {
      about_me: 'Welcome to Crud Example API V1'
    }
    const response = ResponseData.default
    response.data = data
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
