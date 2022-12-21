import { Product, ProductStore } from '../../models/product'
import express, { Request, Response } from 'express'
import path from 'path'
import { pagesPath } from '../../utilities/paths'

const store = new ProductStore()
const login: express.Application = express()

login.get('/', async function (req: Request, res: Response) {
    const result = await store.index()
    res.send(result)
})

export default login

