import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import sign from './api/sign'
import path from 'path'
import { pagesPath } from '../utilities/paths'

const routes: express.Application = express()

routes.use(bodyParser.json())

routes.get('/', function (req: Request, res: Response) {
  res.sendFile(path.join(pagesPath, '/index.html'))
})

routes.use('/Sign', sign)

export { routes }
