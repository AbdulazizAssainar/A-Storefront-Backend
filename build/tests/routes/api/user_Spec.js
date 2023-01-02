"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../../../routes/api/user"));
const app = express_1.default.Router();
describe('Testing user route', () => {
    it('run with status code 200 ', () => {
        user_1.default.get('/user', async (req, res) => {
            await expect(res.statusCode).toEqual(200);
        });
    });
});
