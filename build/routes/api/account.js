"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const { TOKEN_SECRET } = process.env;
const account = (0, express_1.default)();
account.get('/', function (req, res, next) {
    console.log((req.url.split('?')[0]).slice(1));
    console.log('test');
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    let userToken;
    try {
        const tokenParts = token.split('.');
        const encodedPayload = tokenParts[1];
        const rawPayload = atob(encodedPayload);
        const user = JSON.parse(rawPayload);
        userToken = user.username;
    }
    catch (err) {
        console.log(err);
    }
    return res.redirect(`/account/${userToken}`);
});
account.get('/:username', function (req, res, next) {
    const authHeader = req.headers.authorization;
    const username = (req.url.split('?')[0]).slice(1);
    console.log(username);
    const token = authHeader && authHeader.split(' ')[1];
    let userToken;
    try {
        const tokenParts = token.split('.');
        const encodedPayload = tokenParts[1];
        const rawPayload = atob(encodedPayload);
        const user = JSON.parse(rawPayload);
        userToken = user.username;
        console.log(userToken);
    }
    catch (err) {
        console.log(err);
    }
    if (userToken != username) {
        console.log(userToken + ' != ' + username);
        return res.redirect(`/login`);
    }
    if (token == null) {
        return res.status(401).send('Unauthorized'); // Unauthorized
    }
    var decoded = jsonwebtoken_1.default.verify(token, TOKEN_SECRET, (err, user) => {
        if (err != null) {
            return res.status(403).send('Forbidden'); // Forbidden
        }
    });
    return res.status(200).send('this is your Account');
});
exports.default = account;
