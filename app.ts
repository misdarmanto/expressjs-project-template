import { appRouterV1 } from './apps/routes/v1'
import { CONFIG } from './apps/configs'
import express, { type Express } from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { middleware } from './apps/middlewares'

const app: Express = express()
app.use(cors({ origin: true, credentials: true }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(cookieParser())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, content-type, Authorization, Content-Type'
  )
  next()
})

app.use('/public', express.static('public'))
// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.use(middleware.ipBlackList, middleware.useAuthorization)
// eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
app.routes = appRouterV1(app)
app.listen(CONFIG.port, () => {
  console.log(`listening on ${CONFIG.appUrl}:${CONFIG.port}/api/v1`)
})
