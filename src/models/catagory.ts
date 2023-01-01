import client from '../database';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

export interface Catagory {
  id?: Number;
  name: string;
}

export class CatagoryStore {
  async index(): Promise<Catagory[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM catagory';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get Catagorys ${err}`);
    }
  }
}

export class idCatagoryStore {
  id: number;
  constructor(id: number) {
    this.id = id;
  }

  async index(): Promise<Catagory[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM Catagorys WHERE id = $1';
      const result = await conn.query(sql, [this.id]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get Catagorys ${err}`);
    }
  }
}
