"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../../models/product");
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("../../database"));
const productStore = new product_1.ProductStore();
const users = (0, express_1.default)();
users.get('/', async function (req, res) {
    database_1.default.connect(async (err, connection) => {
        const sqlProducts = 'SELECT * FROM Users';
        const Users = await connection.query(sqlProducts);
        let array = [];
        for (var i = 0, row; (row = Users.rows[i]); i++) {
            array.push(row);
        }
        res.send(array);
    });
});
exports.default = users;
