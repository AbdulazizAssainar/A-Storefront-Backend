import express, { Request, Response } from 'express'
import { pagesPath } from '../../utilities/paths'
import client from '../../database'
import dotenv from 'dotenv'

dotenv.config()
const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env

const register: express.Application = express()
const bcrypt = require('bcrypt')

register.use(express.json())

register.get('/', async function (req: Request, res: Response) {
  // get some data from url
  const username: string = String(req.query.username)
  const firstname: string = String(req.query.firstname)
  const lastname: string = String(req.query.lastname)
  const password: string = String(req.query.password)

  client.connect(async (err, connection) => {
    // if any data in undefined return registration file
    if (username == 'undefined') {
      console.log('username is undefined')
      return res.sendFile(pagesPath + '/registration.html')
    }
    if (firstname == 'undefined') {
      console.log('firstname is undefined')
      return res.sendFile(pagesPath + '/registration.html')
    }
    if (lastname == 'undefined') {
      console.log('lastname is undefined')
      return res.sendFile(pagesPath + '/registration.html')
    }
    if (password == 'undefined') {
      console.log('password is undefined')
      return res.sendFile(pagesPath + '/registration.html')
    }

    const sqlSearch = 'SELECT * FROM users WHERE username = $1'
    const sqlInsert =
      'INSERT INTO users (username, firstname, lastname, password) VALUES ($1, $2, $3, $4) RETURNING *'

    connection.query(sqlSearch, [username], async (err, result) => {
      // throw err if found
      if (err) throw err

      if (result.rowCount != 0) {
        // if username already registered
        console.log('User Found')
        return res.sendFile(pagesPath + '/userfound.html') // send redirect file
      } else {
        // if username isn't found then create user
        // hash password frist
        const hash = bcrypt.hashSync(
          password + String(BCRYPT_PASSWORD),
          parseInt(String(SALT_ROUNDS))
        )

        // Create new user
        const result = await connection.query(sqlInsert, [
          username,
          firstname,
          lastname,
          hash
        ])
        return res.sendFile(pagesPath + '/user-registered.html') // send redirect file
      }
    }) // connection.query()
    return
  }) // client.connect()
  // jwt.sign()
  // jwt.verify()
  return
})

export default register
