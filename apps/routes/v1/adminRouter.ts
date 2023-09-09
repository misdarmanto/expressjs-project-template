/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import express, { type Express, type Request, type Response } from 'express'
import { middleware } from '../../middlewares'
import { findAllAdmin, findOneAdmin } from '../../controllers/admin/find'
import { loginAdmin } from '../../controllers/admin/login'
import { createAdmin } from '../../controllers/admin/creat'
import { updateAdmin } from '../../controllers/admin/update'
import { removeAdmin } from '../../controllers/admin/remove'

export const adminRouter = (app: Express): void => {
  const router = express.Router()
  app.use('/api/v1/admin', middleware.useAuthorization, router)
  router.get('/list', async (req: Request, res: Response) => await findAllAdmin(req, res))
  router.get(
    '/detail/:adminId',
    async (req: Request, res: Response) => await findOneAdmin(req, res)
  )
  router.post('/login', async (req: Request, res: Response) => await loginAdmin(req, res))
  router.post('/', async (req: Request, res: Response) => await createAdmin(req, res))
  router.patch('/', async (req: Request, res: Response) => await updateAdmin(req, res))
  router.delete('/', async (req: Request, res: Response) => await removeAdmin(req, res))
}
