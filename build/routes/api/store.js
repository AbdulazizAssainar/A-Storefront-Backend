"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../../models/product");
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("../../database"));
const paths_1 = require("../../utilities/paths");
const productStore = new product_1.ProductStore();
const store = (0, express_1.default)();
store.get('/', async function (req, res) {
    const result = await productStore.index();
    return res.send(result);
});
store.get('/add', async function (req, res) {
    // get some data from url
    const name = String(req.query.name);
    const price = String(req.query.price);
    const category = String(req.query.category);
    database_1.default.connect(async (err, connection) => {
        // if any data in undefined return registration file
        if (name == 'undefined') {
            console.log('name is undefined');
            return res.sendFile(paths_1.pagesPath + '/registration.html');
        }
        if (price == 'undefined') {
            console.log('price is undefined');
            return res.sendFile(paths_1.pagesPath + '/registration.html');
        }
        if (category == 'undefined') {
            console.log('category is undefined');
            return res.sendFile(paths_1.pagesPath + '/registration.html');
        }
        const sqlSearch = 'SELECT * FROM products WHERE name = $1';
        const sqlInsert = 'INSERT INTO users (name , price, category) VALUES ($1, $2, $3) RETURNING *';
        connection.query(sqlSearch, [name], async (err, result) => {
            // throw err if found
            if (err)
                throw err;
            if (result.rowCount != 0) {
                // if username already registered
                console.log('Product Found');
                return res.sendStatus(403).send('Product already found'); // send redirect file
            }
            else {
                // Create new user
                const result = await connection.query(sqlInsert, [
                    name,
                    price,
                    category
                ]);
                return res.sendFile(paths_1.pagesPath + '/user-registered.html'); // send redirect file
            }
        }); // connection.query()
        return;
    }); // client.connect()
    return;
});
exports.default = store;
