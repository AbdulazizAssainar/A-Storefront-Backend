"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../../models/product");
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("../../database"));
const paths_1 = require("../../utilities/paths");
const account_1 = require("./account");
const productStore = new product_1.ProductStore();
const store = (0, express_1.default)();
store.get('/cart/cartFunctions', (req, res) => {
    res.sendFile(paths_1.buildPath + '/models/cart.js');
});
store.get('/cart/Products', (req, res) => {
    database_1.default.connect(async (err, connection) => {
        const sqlProducts = 'SELECT * FROM Products';
        const Products = await connection.query(sqlProducts);
        let array = [];
        for (var i = 0, row; (row = Products.rows[i]); i++) {
            array.push(row);
        }
        res.send(array);
    });
});
store.get('/', async function (req, res) {
    const result = await productStore.index();
    return res.send(result);
});
store.get('/addproduct', async function (req, res) {
    // get some data from url
    const name = String(req.query.name);
    const price = String(req.query.price);
    const category = String(req.query.category);
    database_1.default.connect(async (err, connection) => {
        // if any data in undefined return registration file
        if (name == 'undefined') {
            console.log('name is undefined');
            return res.sendFile(paths_1.pagesPath + '/addProduct.html');
        }
        if (price == 'undefined') {
            console.log('price is undefined');
            return res.sendFile(paths_1.pagesPath + '/addProduct.html');
        }
        if (category == 'undefined') {
            console.log('category is undefined');
            return res.sendFile(paths_1.pagesPath + '/addProduct.html');
        }
        const sqlSearch = 'SELECT * FROM products WHERE name = $1';
        const sqlCatagory = 'SELECT * FROM catagory WHERE name = $1';
        const sqlInsert = 'INSERT INTO products (name , price, category) VALUES ($1, $2, $3) RETURNING *';
        connection.query(sqlSearch, [name], async (err, result) => {
            // throw err if found
            if (err)
                throw err;
            if (result.rowCount != 0) {
                // if username already registered
                console.log('Product Found');
                return res.send('Product already found');
            }
            else {
                connection.query(sqlCatagory, [category], async (err, result) => {
                    if (result.rowCount == 0) {
                        return res.send('Catagory not found');
                    }
                    else {
                        // Create new user
                        const result = await connection.query(sqlInsert, [
                            name,
                            price,
                            category,
                        ]);
                        return res.send('Product Added');
                    }
                });
            }
        }); // connection.query()
        return;
    }); // client.connect()
    return;
});
store.get('/addcatagory', async function (req, res) {
    // get some data from url
    const name = String(req.query.name);
    database_1.default.connect(async (err, connection) => {
        // if any data in undefined return registration file
        if (name == 'undefined') {
            console.log('name is undefined');
            return res.sendFile(paths_1.pagesPath + '/addCatagory.html');
        }
        const sqlSearch = 'SELECT * FROM catagory WHERE name = $1';
        const sqlInsert = 'INSERT INTO catagory (name) VALUES ($1) RETURNING *';
        connection.query(sqlSearch, [name], async (err, result) => {
            // throw err if found
            if (err)
                throw err;
            if (result.rowCount != 0) {
                // if username already registered
                console.log('Product Found');
                return res.send('Catagory already found');
            }
            else {
                // Create new user
                const result = await connection.query(sqlInsert, [name]);
                return res.send('Catagory Added');
            }
        }); // connection.query()
        return;
    }); // client.connect()
    return;
});
store.get('/cart', account_1.authorization, async function (req, res) {
    //get username from token
    const authHeader = req.headers.cookie?.slice(12); //req.headers.authorization
    const token = authHeader; //&& authHeader.split(' ')[1]
    const tokenParts = token.split('.');
    const encodedPayload = tokenParts[1];
    const rawPayload = atob(encodedPayload);
    const user = JSON.parse(rawPayload);
    const useridToken = user.id;
    // get some data from url
    const products = String(req.query.products);
    const amounts = String(req.query.amounts);
    database_1.default.connect(async (err, connection) => {
        // if any data in undefined return registration file
        if (products == 'undefined') {
            console.log('products is undefined');
            return res.sendFile(paths_1.pagesPath + '/createOrder.html');
        }
        if (amounts == 'undefined') {
            console.log('amounts is undefined');
            return res.sendFile(paths_1.pagesPath + '/createOrder.html');
        }
        const productsList = JSON.parse(`[${products}]`);
        const amountsList = JSON.parse(`[${amounts}]`);
        const sqlOrder = 'INSERT INTO orders (user_id, status, product, amount) VALUES ($1, $2, $3, $4)';
        const result = await connection.query(sqlOrder, [
            useridToken,
            true,
            products,
            amounts,
        ]);
        return res.send('done');
    }); // client.connect()
});
exports.default = store;
