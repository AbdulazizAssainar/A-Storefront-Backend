"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.idProductStore = exports.ProductStore = void 0;
const database_1 = __importDefault(require("../database"));
class ProductStore {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot get products ${err}`);
        }
    }
}
exports.ProductStore = ProductStore;
class idProductStore {
    constructor(id) {
        this.id = id;
    }
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM products WHERE id = $1';
            const result = await conn.query(sql, [this.id]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot get products ${err}`);
        }
    }
}
exports.idProductStore = idProductStore;
