import express, { Request, Response } from 'express'
import login from './api/login'
import signup from './api/signup'
import path from 'path'
import { pagesPath } from '../utilities/paths'

const routes: express.Application = express()

routes.get('/', function (req: Request, res: Response) {
  res.sendFile(path.join(pagesPath, '/index.html'))
})

routes.use('/signup', signup)
routes.use('/login', login)

export { routes }
