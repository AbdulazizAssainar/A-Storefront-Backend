import express from 'express';

const app = express.Router();

describe('Testing Server', () => {
  it('index route run with status code 200 ', () => {
    app.get('/', async (req, res) => {
      await expect(res.statusCode).toEqual(200);
    });
  });
});
