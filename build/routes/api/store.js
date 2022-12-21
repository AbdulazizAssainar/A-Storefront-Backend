"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../../models/product");
const express_1 = __importDefault(require("express"));
const store = new product_1.ProductStore();
const login = (0, express_1.default)();
login.get('/', async function (req, res) {
    const result = await store.index();
    res.send(result);
});
exports.default = login;
