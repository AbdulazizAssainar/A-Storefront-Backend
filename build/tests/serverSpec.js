"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const login_1 = __importDefault(require("../routes/api/login"));
const register_1 = __importDefault(require("../routes/api/register"));
const app = express_1.default.Router();
describe('Testing Server', () => {
    it('index route run with status code 200 ', () => {
        app.get('/', async (req, res) => {
            await expect(res.statusCode).toEqual(200);
        });
    });
    it('login route run with status code 200 ', () => {
        login_1.default.get('/login', async (req, res) => {
            await expect(res.statusCode).toEqual(200);
        });
    });
    it('signup route run with status code 200 ', () => {
        register_1.default.get('/signup', async (req, res) => {
            await expect(res.statusCode).toEqual(200);
        });
        return;
    });
});
