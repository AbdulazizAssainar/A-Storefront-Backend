import express, { Request, Response } from 'express'
import { pagesPath } from '../utilities/paths'
import register from './api/register'
import account from './api/account'
import login from './api/login'
import store from './api/store'

const routes: express.Application = express()

routes.get('/', function (req: Request, res: Response) {
  res.send('Index route')
})

routes.use('/login', login)
routes.use('/register', register)
routes.use('/account', account)
routes.use('/store', store)

routes.get('/pages/style/main.css', (req, res) => {
  res.sendFile(pagesPath + '/style/main.css')
})
routes.get('/pages/style/registration.css', (req, res) => {
  res.sendFile(pagesPath + '/style/registration.css')
})

export { routes }
