"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const account_1 = __importDefault(require("../../../routes/api/account"));
const app = express_1.default.Router();
describe('Testing account route', () => {
    it('run with status code 200 ', () => {
        account_1.default.get('/account', async (req, res) => {
            await expect(res.statusCode).toEqual(200);
        });
    });
});
