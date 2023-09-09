import express, { type Express } from 'express'

export const userRoutes = (app: Express): void => {
  const route = express.Router()
  app.use('/api/v1/users', route)
}
