import express, { Request, Response } from 'express'
import { pagesPath } from '../../utilities/paths'
import client from '../../database'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
dotenv.config()
const { BCRYPT_PASSWORD, TOKEN_SECRET } = process.env

const login: express.Application = express()

login.get('/', function (req: Request, res: Response) {
  // get some data from url
  const username: string = String(req.query.username)
  const password: string = String(req.query.password)
  const apiUrl: string = String(req.baseUrl);

  client.connect(async (err, connection) => {
    // if any data in undefined return registration file
    if (username == 'undefined') {
      console.log('username is undefined')
      return res.sendFile(pagesPath + '/login.html')
    }
    if (password == 'undefined') {
      console.log('password is undefined')
      return res.sendFile(pagesPath + '/login.html')
    }

    const sqlSearch = 'SELECT * FROM users WHERE username = $1'

    connection.query(sqlSearch, [username], async (err, result) => {
      // throw err if found
      if (err) throw err

      if (result.rowCount != 0) {
        // if username already registered
        console.log('User Found')
        const user = result.rows[0]

        if (bcrypt.compareSync(password + BCRYPT_PASSWORD!, user.password)) {
          const token = jwt.sign(user, TOKEN_SECRET!, { expiresIn: '10d' })
          console.log(JSON.stringify({ accessToken: token }))
          return res.setHeader('accessToken', token).redirect(`/account/${username}`)
          
        } else {
          console.log("Wrong Password")
        }
      } else {
        console.log("User doesn't exists")
      }
    }) // connection.query()
  }) // client.connect()
})

export default login
