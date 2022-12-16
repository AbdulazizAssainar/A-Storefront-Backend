import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import path from 'path'

const sign: express.Application = express()

sign.use(bodyParser.json())

sign.get('/Sign', function (req: Request, res: Response) {
  res.sendFile(path.join(__dirname, '../pages/sign.html'))
})

export default sign
