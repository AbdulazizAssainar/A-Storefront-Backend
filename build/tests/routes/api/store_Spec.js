"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const store_1 = __importDefault(require("../../../routes/api/store"));
const app = express_1.default.Router();
describe('Testing store route', () => {
    it('run with status code 200 ', () => {
        store_1.default.get('/store', async (req, res) => {
            await expect(res.statusCode).toEqual(200);
        });
    });
    it('products route run with status code 200 ', () => {
        store_1.default.get('/products', async (req, res) => {
            await expect(res.statusCode).toEqual(200);
        });
    });
    it('catagroies route run with status code 200 ', () => {
        store_1.default.get('/catagroies', async (req, res) => {
            await expect(res.statusCode).toEqual(200);
        });
    });
    it('add product route run with status code 200 ', () => {
        store_1.default.get('/addproduct', async (req, res) => {
            await expect(res.statusCode).toEqual(200);
        });
    });
    it('add catagory route run with status code 200 ', () => {
        store_1.default.get('/addcatagory', async (req, res) => {
            await expect(res.statusCode).toEqual(200);
        });
    });
    it('cart route run with status code 200 ', () => {
        store_1.default.get('/cart', async (req, res) => {
            await expect(res.statusCode).toEqual(200);
        });
    });
});
