import client from '../database';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

export interface Product {
  id?: Number;
  name: string;
  price: number;
  category: string;
}

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM products';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get products ${err}`);
    }
  }
}

export class idProductStore {
  id: number;
  constructor(id: number) {
    this.id = id;
  }

  async index(): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM products WHERE id = $1';
      const result = await conn.query(sql, [this.id]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get products ${err}`);
    }
  }
}
