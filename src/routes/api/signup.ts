import express, { Request, Response } from 'express'
import path from 'path'
import client from '../../database'
import { pagesPath } from '../../utilities/paths'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { CreateUser, User, UsersAccount } from '../../models/user'
import { QueryResult } from 'pg'

dotenv.config()

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_TEST_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  ENV,
  BCRYPT_PASSWORD,
  SALT_ROUNDS,
  TOKEN_SECRET
} = process.env

const signup: express.Application = express()
const bcrypt = require("bcrypt")

signup.use(express.json())
signup.get('/', async function (req: Request, res: Response) {
  const username: string = String(req.query.username)
  const firstName: string = String(req.query.firstName)
  const lastName: string = String(req.query.lastName)
  const password: string = String(req.query.password)

  client.connect( async (err, connection) => {
    if (username == undefined) return res.send ("username is undefined")
    if (firstName == undefined) return res.send ("firstName is undefined")
    if (lastName == undefined) return res.send ("lastName is undefined")
    if (password == undefined) return res.send ("password is undefined")
    
    const sqlSearch = `SELECT * FROM users WHERE username = ${username}`
    const sqlInsert = "INSERT INTO users (username, firstName, lastName, password) VALUES ($1, $2, $3, $4) RETURNING *"

    connection.query(sqlSearch, async (err, result) => {
        if (err)
          throw (err)
        console.log("Search Results")
        console.log(result.rowCount)
        if (result.rowCount != 0) {
          console.log("User already exists")
          connection.release()
          res.sendStatus(409)
        }
        else {
          const hash = bcrypt.hashSync(
            password + String(BCRYPT_PASSWORD), 
            parseInt(String(SALT_ROUNDS))
          )
          
          const result = await connection.query(sqlInsert, [username, firstName, lastName, hash])
          console.log("Insert Results")
          console.log(result.rows)
      }
    }) //end of connection.query()
 //end of connection.query()
  }) //end of client.connect()
  //jwt.sign()
  //jwt.verify()
})

export default signup

