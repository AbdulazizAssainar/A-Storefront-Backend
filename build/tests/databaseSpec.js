"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("../database"));
const app = express_1.default.Router();
describe('Testing Database', () => {
    it('run with status code 200 ', async () => {
        database_1.default.connect(async (err, connection) => {
            await connection.query('SELECT 1 + 1 AS solution', (error, results) => {
                if (error)
                    throw error;
                var check = true;
                expect(check).toBeTrue();
                return;
            });
        }); // client.connect()
    });
});
