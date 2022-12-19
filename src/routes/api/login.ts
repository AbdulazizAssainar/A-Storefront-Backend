import express, { Request, Response } from 'express'
import path from 'path'
import { pagesPath } from '../../utilities/paths'

const login: express.Application = express()

login.get('/', function (req: Request, res: Response) {
  res.send('login route')
})

export default login
