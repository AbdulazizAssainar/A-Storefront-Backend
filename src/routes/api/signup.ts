import express, { Request, Response } from 'express'
import path from 'path'
import { pagesPath } from '../../utilities/paths'

const signup: express.Application = express()

signup.get('/', function (req: Request, res: Response) {
  res.send('signup route')
})

export default signup
