import express from 'express';
import user from '../../../routes/api/user';

const app = express.Router();

describe('Testing user route', () => {
  it('run with status code 200 ', () => {
    user.get('/user', async (req, res) => {
      await expect(res.statusCode).toEqual(200);
    });
  });
});
