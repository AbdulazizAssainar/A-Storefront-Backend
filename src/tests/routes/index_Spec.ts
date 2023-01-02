import express from 'express';
import { routes } from '../../routes';

describe('Testing index route', () => {
  it('run with status code 200 ', () => {
    routes.get('/', async (req, res) => {
      await expect(res.statusCode).toEqual(200);
    });
  });
});
