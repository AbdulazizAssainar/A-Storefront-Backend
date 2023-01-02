import express from 'express';
import account from '../../../routes/api/account';

const app = express.Router();

describe('Testing account route', () => {
  it('run with status code 200 ', () => {
    account.get('/account', async (req, res) => {
      await expect(res.statusCode).toEqual(200);
    });
  });
});
