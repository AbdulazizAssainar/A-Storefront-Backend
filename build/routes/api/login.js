"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const paths_1 = require("../../utilities/paths");
const database_1 = __importDefault(require("../../database"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const axios_1 = __importDefault(require("axios"));
dotenv_1.default.config();
const { BCRYPT_PASSWORD, TOKEN_SECRET } = process.env;
const login = (0, express_1.default)();
login.get('/', function (req, res) {
    // get some data from url
    const username = String(req.query.username);
    const password = String(req.query.password);
    const apiUrl = String(req.baseUrl);
    database_1.default.connect(async (err, connection) => {
        // if any data in undefined return registration file
        if (username == 'undefined') {
            console.log('username is undefined');
            return res.sendFile(paths_1.pagesPath + '/login.html');
        }
        if (password == 'undefined') {
            console.log('password is undefined');
            return res.sendFile(paths_1.pagesPath + '/login.html');
        }
        const sqlSearch = 'SELECT * FROM users WHERE username = $1';
        connection.query(sqlSearch, [username], async (err, result) => {
            // throw err if found
            if (err)
                throw err;
            if (result.rowCount != 0) {
                // if username already registered
                console.log('User Found');
                const user = result.rows[0];
                if (bcrypt_1.default.compareSync(password + BCRYPT_PASSWORD, user.password)) {
                    const token = jsonwebtoken_1.default.sign(user, TOKEN_SECRET, { expiresIn: '10d' });
                    console.log(JSON.stringify({ accessToken: token }));
                    axios_1.default.interceptors.request.use(req => {
                        req.headers.authorization = token;
                        return req;
                    });
                    return res
                        .setHeader('accessToken', token)
                        .send('aaccessToken generated for 10 Days');
                }
                else {
                    console.log('Wrong Password');
                }
            }
            else {
                console.log("User doesn't exists");
            }
        }); // connection.query()
    }); // client.connect()
});
exports.default = login;
