"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const register_1 = __importDefault(require("../../../routes/api/register"));
const app = express_1.default.Router();
describe('Testing signup route', () => {
    it('run with status code 200 ', () => {
        register_1.default.get('/signup', async (req, res) => {
            await expect(res.statusCode).toEqual(200);
        });
    });
});
