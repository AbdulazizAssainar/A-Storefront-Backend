import client from '../database'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'

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

export interface User {
  id?: number
  username: string | number
  firstName?: string
  lastName?: string
  password?: string | number
}

export class UsersAccount {
  async index (): Promise<User[]> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM users'
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`Cannot get users ${err}`)
    }
  }
}

export class CreateUser {
  username: string | number
  firstName: string
  lastName: string
  password: string | number
  users!: string[]
 
  constructor(username: string | number, firstName: string, lastName: string, password: string | number) {
    this.username = username
    this.firstName = firstName
    this.lastName = lastName
    this.password = password
  }

  async create(u: User): Promise<User> {
    try {

      u.username = this.username
      u.firstName = this.firstName
      u.lastName = this.lastName
      u.password = this.password

      // @ts-ignore
      const conn = await client.connect()
      const sql = 'INSERT INTO users (username, firstName, lastName, password) VALUES ($1, $2, $3, $4) RETURNING *'
      const getSql = 'GET * FROM users'

      const hash = bcrypt.hashSync(
        u.password + String(BCRYPT_PASSWORD), 
        parseInt(String(SALT_ROUNDS))
      )

      const result = await conn.query(sql, [u.username, u.firstName, u.lastName, hash])
      const getall = await conn.query(getSql)
      const user = result.rows[0]

      conn.release()
      return user
    } catch(user) {
      throw new Error(`unable create user (${u.username}): ${user}`)
      } 
  }
}

export  class  Authenticate {
  username: string | number
  password: string | number
  users!: string[]
 
  constructor(username: string | number, password: string | number) {
    this.username = username
    this.password = password
  }

  async authenticate(): Promise<User | null> {
    const conn = await client.connect()
    const sql = 'SELECT password_digest FROM users WHERE username=($1)'

    const result = await conn.query(sql, [this.username])

    console.log(this.password+BCRYPT_PASSWORD!)

    if(result.rows.length) {

      const user = result.rows[0]

      console.log(user)

      if (bcrypt.compareSync(this.password+BCRYPT_PASSWORD!, user.password_digest)) {
        return user
      }
    }

    return null
  }
}
