import { ProductStore } from '../../models/product'
import express, { Request, Response } from 'express'
import client from '../../database'
import bcrypt from 'bcrypt'
import { pagesPath } from '../../utilities/paths'

const productStore = new ProductStore()
const store: express.Application = express()

store.get('/', async function (req: Request, res: Response) {
  const result = await productStore.index()
  return res.send(result)
})

store.get('/add', async function (req: Request, res: Response) {
  // get some data from url
  const name: string = String(req.query.name)
  const price: string = String(req.query.price)
  const category: string = String(req.query.category)

  client.connect(async (err, connection) => {
    // if any data in undefined return registration file
    if (name == 'undefined') {
      console.log('name is undefined')
      return res.sendFile(pagesPath + '/registration.html')
    }
    if (price == 'undefined') {
      console.log('price is undefined')
      return res.sendFile(pagesPath + '/registration.html')
    }
    if (category == 'undefined') {
      console.log('category is undefined')
      return res.sendFile(pagesPath + '/registration.html')
    }

    const sqlSearch = 'SELECT * FROM products WHERE name = $1'
    const sqlInsert =
      'INSERT INTO users (name , price, category) VALUES ($1, $2, $3) RETURNING *'

    connection.query(sqlSearch, [name], async (err, result) => {
      // throw err if found
      if (err) throw err

      if (result.rowCount != 0) {
        // if username already registered
        console.log('Product Found')
        return res.sendStatus(403).send('Product already found')// send redirect file
      } else {
        // Create new user
        const result = await connection.query(sqlInsert, [
          name, 
          price, 
          category
        ])
        return res.sendFile(pagesPath + '/user-registered.html') // send redirect file
      }
    }) // connection.query()
    return
  }) // client.connect()
  return
})

export default store
