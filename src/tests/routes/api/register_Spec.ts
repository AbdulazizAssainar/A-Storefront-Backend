import express from 'express';
import login from '../../../routes/api/login';
import register from '../../../routes/api/register';

const app = express.Router();

describe('Testing signup route', () => {
  it('run with status code 200 ', () => {
    register.get('/signup', async (req, res) => {
      await expect(res.statusCode).toEqual(200);
    });
  });
});
