import { ProductStore } from '../../models/product';
import express, { Request, Response } from 'express';
import client from '../../database';
import { buildPath, pagesPath } from '../../utilities/paths';
import { TableHTMLAttributes } from 'react';
import { authorization } from './account';

const productStore = new ProductStore();
const store: express.Application = express();

store.get('/cart/cartFunctions', (req, res) => {
  res.sendFile(buildPath + '/models/cart.js');
});

store.get('/cart/Products', (req, res) => {
  client.connect(async (err, connection) => {
    const sqlProducts = 'SELECT * FROM Products';
    const Products = await connection.query(sqlProducts);
    let array = [];
    for (var i = 0, row; (row = Products.rows[i]); i++) {
      array.push(row);
    }
    res.send(array);
  });
});

store.get('/', async function (req: Request, res: Response) {
  const result = await productStore.index();
  return res.send(result);
});

store.get('/addproduct', async function (req: Request, res: Response) {
  // get some data from url
  const name: string = String(req.query.name);
  const price: string = String(req.query.price);
  const category: string = String(req.query.category);

  client.connect(async (err, connection) => {
    // if any data in undefined return registration file
    if (name == 'undefined') {
      console.log('name is undefined');
      return res.sendFile(pagesPath + '/addProduct.html');
    }
    if (price == 'undefined') {
      console.log('price is undefined');
      return res.sendFile(pagesPath + '/addProduct.html');
    }
    if (category == 'undefined') {
      console.log('category is undefined');
      return res.sendFile(pagesPath + '/addProduct.html');
    }

    const sqlSearch = 'SELECT * FROM products WHERE name = $1';
    const sqlCatagory = 'SELECT * FROM catagory WHERE name = $1';
    const sqlInsert =
      'INSERT INTO products (name , price, category) VALUES ($1, $2, $3) RETURNING *';

    connection.query(sqlSearch, [name], async (err, result) => {
      // throw err if found
      if (err) throw err;

      if (result.rowCount != 0) {
        // if username already registered
        console.log('Product Found');
        return res.send('Product already found');
      } else {
        connection.query(sqlCatagory, [category], async (err, result) => {
          if (result.rowCount == 0) {
            return res.send('Catagory not found');
          } else {
            // Create new user
            const result = await connection.query(sqlInsert, [
              name,
              price,
              category,
            ]);
            return res.send('Product Added');
          }
        });
      }
    }); // connection.query()
    return;
  }); // client.connect()
  return;
});

store.get('/addcatagory', async function (req: Request, res: Response) {
  // get some data from url
  const name: string = String(req.query.name);

  client.connect(async (err, connection) => {
    // if any data in undefined return registration file
    if (name == 'undefined') {
      console.log('name is undefined');
      return res.sendFile(pagesPath + '/addCatagory.html');
    }

    const sqlSearch = 'SELECT * FROM catagory WHERE name = $1';
    const sqlInsert = 'INSERT INTO catagory (name) VALUES ($1) RETURNING *';

    connection.query(sqlSearch, [name], async (err, result) => {
      // throw err if found
      if (err) throw err;

      if (result.rowCount != 0) {
        // if username already registered
        console.log('Product Found');
        return res.send('Catagory already found');
      } else {
        // Create new user
        const result = await connection.query(sqlInsert, [name]);
        return res.send('Catagory Added');
      }
    }); // connection.query()
    return;
  }); // client.connect()
  return;
});

store.get('/cart', authorization, async function (req: Request, res: Response) {
  //get username from token
  const authHeader = req.headers.cookie?.slice(12); //req.headers.authorization
  const token = authHeader; //&& authHeader.split(' ')[1]
  const tokenParts = token!.split('.');
  const encodedPayload = tokenParts[1];
  const rawPayload = atob(encodedPayload);
  const user = JSON.parse(rawPayload);
  const useridToken = user.id;

  // get some data from url
  const products: string = String(req.query.products);
  const amounts: string = String(req.query.amounts);

  client.connect(async (err, connection) => {
    // if any data in undefined return registration file
    if (products == 'undefined') {
      console.log('products is undefined');
      return res.sendFile(pagesPath + '/createOrder.html');
    }
    if (amounts == 'undefined') {
      console.log('amounts is undefined');
      return res.sendFile(pagesPath + '/createOrder.html');
    }

    const productsList: string[] = JSON.parse(`[${products}]`);
    const amountsList: string[] = JSON.parse(`[${amounts}]`);
    const sqlOrder =
      'INSERT INTO orders (user_id, status, product, amount) VALUES ($1, $2, $3, $4)';
    const result = await connection.query(sqlOrder, [
      useridToken,
      true,
      products,
      amounts,
    ]);
    return res.send('done');
  }); // client.connect()
});

export default store;
