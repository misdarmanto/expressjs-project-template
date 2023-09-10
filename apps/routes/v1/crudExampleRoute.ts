/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import express, { type Express, type Request, type Response } from 'express'
import { crudExampleController } from '../../controllers/crudExample'

export const crudExampleRoutes = (app: Express) => {
  const route = express.Router()
  app.use('/api/v1/crud-example', route)

  route.get(
    '/list',
    async (req: Request, res: Response) => await crudExampleController.findAll(req, res)
  )
  route.get(
    '/detail/:crudExampleId',
    async (req: Request, res: Response) => await crudExampleController.findOne(req, res)
  )
  route.post(
    '/',
    async (req: Request, res: Response) => await crudExampleController.create(req, res)
  )
  route.patch(
    '/',
    async (req: Request, res: Response) => await crudExampleController.update(req, res)
  )
  route.delete(
    '/',
    async (req: Request, res: Response) => await crudExampleController.remove(req, res)
  )
}
