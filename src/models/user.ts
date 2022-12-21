import client from '../database'
import dotenv from 'dotenv'

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
  firstName: string
  lastName: string
  password: string | number
}

export class UserAccount {
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

/*
export class UserSignin {
  async authenticate(username: string, password: string): Promise<User | null> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT password FROM users WHERE username=($1)'
      console.log(password+pepper)
      if (resulte.rows.length) {
        const user = resulte.row[0]
        console.log(user)
        if (bcrypt.compareSync(password+pepper, user.password)) {
          return user
        }
      }
      return null
    } catch (err) {
      throw new Error(`Can't Signin ${err}`)
    }
  }
}

const show = async (_req: Request, res: Response) => {
  const user = await store.show(_req.body.id)
  res.json(user)
}

const create = async (_req: Request, res: Response) => {
  const user: User = {
    username: _req.body.username,
    password: _req.body.password
  }
  try {
    const newUser = await store.create(user)
    var token = jwt.sign({user: newUser}, process.env.TOKEN_SECRET)
    res.json(token)
  } catch (err) {
    res.status(400)
    res.json(err + user)
  }
}
*/