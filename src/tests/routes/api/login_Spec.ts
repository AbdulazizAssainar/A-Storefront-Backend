import express from 'express';
import login from '../../../routes/api/login';

const app = express.Router();

describe('Testing login route', () => {
  it('run with status code 200 ', () => {
    login.get('/login', async (req, res) => {
      await expect(res.statusCode).toEqual(200);
    });
  });
});
