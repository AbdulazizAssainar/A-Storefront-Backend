import express, { Request, Response } from 'express'
import authenticate from './api/authenticate'
import register from './api/register'
import path from 'path'
import { pagesPath } from '../utilities/paths'
import account from './api/account'

const routes: express.Application = express()

routes.get('/', function (req: Request, res: Response) {
  res.send('Index route')
})
routes.get('/pages/style/main.css', (req, res) => {
  res.sendFile(pagesPath+'/style/main.css')
})
routes.get('/pages/style/registration.css', (req, res) => {
  res.sendFile(pagesPath+'/style/registration.css')
})

routes.use('/login', authenticate)
routes.use('/register', register)

export { routes }
