"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default.Router();
describe('Testing Server', () => {
    it('index route run with status code 200 ', () => {
        app.get('/', async (req, res) => {
            await expect(res.statusCode).toEqual(200);
        });
    });
});
