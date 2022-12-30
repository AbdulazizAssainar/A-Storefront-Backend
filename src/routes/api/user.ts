import { ProductStore } from '../../models/product';
import express, { Request, Response } from 'express';
import client from '../../database';
import { buildPath, pagesPath } from '../../utilities/paths';
import { TableHTMLAttributes } from 'react';
import { authorization } from './account';

const productStore = new ProductStore();
const users: express.Application = express();

users.get('/', async function (req: Request, res: Response) {
  client.connect(async (err, connection) => {
    const sqlProducts = 'SELECT * FROM Users';
    const Users = await connection.query(sqlProducts);
    let array = [];
    for (var i = 0, row; (row = Users.rows[i]); i++) {
      array.push(row);
    }
    res.send(array);
  });
});

export default users;
