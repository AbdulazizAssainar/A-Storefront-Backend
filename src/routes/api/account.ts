import express, { Request, Response } from 'express'
import { pagesPath } from '../../utilities/paths'
import client from '../../database'
import dotenv from 'dotenv'
import path from 'path'
import bcrypt from 'bcrypt'
import { Authenticate } from '../../models/user'
import jwt from "jsonwebtoken";

dotenv.config()
const {
  BCRYPT_PASSWORD, 
  TOKEN_SECRET, 
  REFRESH_TOKEN
} = process.env

const account: express.Application = express()

account.get('/', function (req: Request, res: Response, next) {
    const authHeader = req.headers["authorization"]; 
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
        return res.status(401).send('Unauthorized'); // Unauthorized
    }
    
    var decoded = jwt.verify(token!, TOKEN_SECRET!, (err, user) => {
      if (err) {
        return res.status(403).send('Forbidden'); // Forbidden
      }
      //req.user = user
      next()
    })
    
})

export default account
