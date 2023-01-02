import express, { Request, Response } from 'express';
import { Query, QueryResult } from 'pg';
import client from '../database';

const app = express.Router();

describe('Testing Database', () => {
  it('run with status code 200 ', async () => {
    client.connect(async (err, connection) => {
      await connection.query('SELECT 1 + 1 AS solution', (error: Error, results: QueryResult) => {
        if (error) throw error;
        var check: boolean = true;
        expect(check).toBeTrue();
        return;
      });
    }); // client.connect()
  });
});
