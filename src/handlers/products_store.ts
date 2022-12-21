import express, { Request, Response } from "express";
import { Product, ProductStore } from "../models/product";

const store = new ProductStore()

const index = async (_req: Request, res: Response) => {
    const products = await store.index()
    res.json(products)
}

const product_routes =  (app: express.Application) => {
    app.get('/products', index)
}

export default product_routes;
