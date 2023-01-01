"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("../../database"));
const paths_1 = require("../../utilities/paths");
const account_1 = require("./account");
const product_1 = require("../../models/product");
const catagory_1 = require("../../models/catagory");
const productStore = new product_1.ProductStore();
const catagoryStore = new catagory_1.CatagoryStore();
const store = (0, express_1.default)();
store.get('/cart/cartFunctions', (req, res) => {
    res.sendFile(paths_1.buildPath + '/models/cart.js');
});
store.get('/', async function (req, res) {
    const productStoreindex = await productStore.index();
    const _productStore = JSON.stringify(productStoreindex);
    const catagoryStoreindex = await catagoryStore.index();
    const _catagoryStore = JSON.stringify(catagoryStoreindex);
    return res.send("Catagroies: " + _catagoryStore + "Products: " + _productStore);
});
store.get('/products', async function (req, res) {
    const index = await productStore.index();
    return res.send(index);
});
store.get('/catagroies', async function (req, res) {
    const index = await catagoryStore.index();
    return res.send(index);
});
store.get('/addproduct', account_1.authorization, async function (req, res) {
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
        const sqlCatagory = 'SELECT * FROM catagory WHERE id = $1';
        const sqlInsert = 'INSERT INTO products (name , price, category) VALUES ($1, $2, $3) RETURNING *';
        connection.query(sqlSearch, [name], async (err, result) => {
            // throw err if found
            if (err)
                throw err;
            if (result.rowCount != 0) {
                console.log('Product Found');
                return res.send('Product already found');
            }
            else {
                connection.query(sqlCatagory, [category], async (err, result) => {
                    if (result.rowCount == 0) {
                        return res.send('Catagory not found');
                    }
                    else {
                        await connection.query(sqlInsert, [name, price, category]);
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
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    const tokenParts = token.split('.');
    const encodedPayload = tokenParts[1];
    const rawPayload = atob(encodedPayload);
    const user = JSON.parse(rawPayload);
    const useridToken = user.id;
    // get some data from url
    const order = String(req.query.order);
    database_1.default.connect(async (err, connection) => {
        // if any data in undefined return registration file
        if (order == 'undefined') {
            console.log('order is undefined');
            return res.sendFile(paths_1.pagesPath + '/createOrder.html');
        }
        const orderList = JSON.parse(`[${order}]`);
        const sqlCreateOrder = 'INSERT INTO orders (status) VALUES ($1)';
        const sqlOrderid = 'SELECT id FROM orders ORDER BY id DESC LIMIT 1';
        const sqlOrder = 'INSERT INTO order_products (user_id, order_id, product_id, quantity) VALUES ($1, $2, $3, $4)';
        connection.query(sqlCreateOrder, [1]);
        const query = await connection.query(sqlOrderid);
        const stringify = JSON.stringify(query.rows);
        const orderID = stringify.substring(9, stringify.length - 4);
        for (var i = 0; i < orderList.length; i++) {
            const product_id = orderList[i][0];
            const quantity = orderList[i][1];
            await connection.query(sqlOrder, [useridToken, orderID, product_id, quantity]);
        }
        return res.send('done');
    }); // client.connect()
});
exports.default = store;
