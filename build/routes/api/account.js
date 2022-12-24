"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const { BCRYPT_PASSWORD, TOKEN_SECRET, REFRESH_TOKEN } = process.env;
const account = (0, express_1.default)();
account.get('/', function (req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
        return res.status(401).send('Unauthorized'); // Unauthorized
    }
    var decoded = jsonwebtoken_1.default.verify(token, TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).send('Forbidden'); // Forbidden
        }
        //req.user = user
        next();
    });
});
exports.default = account;
