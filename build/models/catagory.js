"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.idCatagoryStore = exports.CatagoryStore = void 0;
const database_1 = __importDefault(require("../database"));
class CatagoryStore {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM catagory';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot get Catagoreis ${err}`);
        }
    }
}
exports.CatagoryStore = CatagoryStore;
class idCatagoryStore {
    constructor(id) {
        this.id = id;
    }
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM Catagorys WHERE id = $1';
            const result = await conn.query(sql, [this.id]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot get Catagorys ${err}`);
        }
    }
}
exports.idCatagoryStore = idCatagoryStore;
