import express from 'express';
import store from '../../../routes/api/store';

const app = express.Router();

describe('Testing store route', () => {
  it('run with status code 200 ', () => {
    store.get('/store', async (req, res) => {
      await expect(res.statusCode).toEqual(200);
    });
  });
  it('products route run with status code 200 ', () => {
    store.get('/products', async (req, res) => {
      await expect(res.statusCode).toEqual(200);
    });
  });
  it('catagroies route run with status code 200 ', () => {
    store.get('/catagroies', async (req, res) => {
      await expect(res.statusCode).toEqual(200);
    });
  });
  it('add product route run with status code 200 ', () => {
    store.get('/addproduct', async (req, res) => {
      await expect(res.statusCode).toEqual(200);
    });
  });
  it('add catagory route run with status code 200 ', () => {
    store.get('/addcatagory', async (req, res) => {
      await expect(res.statusCode).toEqual(200);
    });
  });
  it('cart route run with status code 200 ', () => {
    store.get('/cart', async (req, res) => {
      await expect(res.statusCode).toEqual(200);
    });
  });
});
