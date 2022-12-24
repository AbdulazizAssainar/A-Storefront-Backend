"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const paths_1 = require("../../utilities/paths");
const database_1 = __importDefault(require("../../database"));
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const { BCRYPT_PASSWORD, TOKEN_SECRET } = process.env;
const login = (0, express_1.default)();
login.get('/', function (req, res) {
    //get some data from url
    const username = String(req.query.username);
    const password = String(req.query.password);
    database_1.default.connect(async (err, connection) => {
        // if any data in undefined return registration file
        if (username == "undefined") {
            console.log('username is undefined');
            return res.sendFile(paths_1.pagesPath + '/login.html');
        }
        if (password == "undefined") {
            console.log('password is undefined');
            return res.sendFile(paths_1.pagesPath + '/login.html');
        }
        const sqlSearch = "SELECT * FROM users WHERE username = $1";
        const login = new user_1.Login(username, password);
        connection.query(sqlSearch, [username], async (err, result) => {
            // throw err if found  
            if (err)
                throw (err);
            if (result.rowCount != 0) { // if username already registered
                console.log("User Found");
                const user = result.rows[0];
                if (bcrypt_1.default.compareSync(password + BCRYPT_PASSWORD, user.password)) {
                    console.log('compareSync passed');
                    const token = jsonwebtoken_1.default.sign(user, TOKEN_SECRET, { expiresIn: "15m" });
                    return res.status(200).send(JSON.stringify({ accessToken: token }));
                }
                console.log('compareSync error');
            }
            else {
                console.log("User doesn't exists");
            }
        }); //connection.query()
    }); //client.connect()
});
exports.default = login;
