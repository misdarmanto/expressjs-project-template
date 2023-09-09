/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import express, {
  type Express,
  type NextFunction,
  type Request,
  type Response
} from 'express'
import { uploadFile } from '../../controllers/upload-file'
import { uploadMidleWare } from '../../middlewares/upload-file'
import { StatusCodes } from 'http-status-codes'
import { CONFIG } from '../../configs'
import { ResponseData } from '../../utilities/response'

const checkFileSizeMidleWare = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.file != null) {
      const fileSizeKiloBytes = req.file.size / 1024
      if (fileSizeKiloBytes > +CONFIG.maximumUploadFile) {
        throw Error('maksimum file 2mb')
      }
      next()
    }
  } catch (error: any) {
    const message = 'maksimum file 2mbw'
    const response = ResponseData.error(message)
    return res.status(StatusCodes.UNAUTHORIZED).json(response)
  }
}

export const uploadFileRoutes = (app: Express) => {
  const route = express.Router()
  app.use('/upload-file', route)
  route.post(
    '/',
    checkFileSizeMidleWare,
    uploadMidleWare.single('file'),
    async (req: Request, res: Response) => await uploadFile(req, res)
  )
}
