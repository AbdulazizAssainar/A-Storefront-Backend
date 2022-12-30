"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const paths_1 = require("../../utilities/paths");
const database_1 = __importDefault(require("../../database"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
const register = (0, express_1.default)();
const bcrypt = require('bcrypt');
register.use(express_1.default.json());
register.get('/', async function (req, res) {
    // get some data from url
    const username = String(req.query.username);
    const firstname = String(req.query.firstname);
    const lastname = String(req.query.lastname);
    const password = String(req.query.password);
    database_1.default.connect(async (err, connection) => {
        // if any data in undefined return registration file
        if (username == 'undefined') {
            console.log('username is undefined');
            return res.sendFile(paths_1.pagesPath + '/registration.html');
        }
        if (firstname == 'undefined') {
            console.log('firstname is undefined');
            return res.sendFile(paths_1.pagesPath + '/registration.html');
        }
        if (lastname == 'undefined') {
            console.log('lastname is undefined');
            return res.sendFile(paths_1.pagesPath + '/registration.html');
        }
        if (password == 'undefined') {
            console.log('password is undefined');
            return res.sendFile(paths_1.pagesPath + '/registration.html');
        }
        const sqlSearch = 'SELECT * FROM users WHERE username = $1';
        const sqlInsert = 'INSERT INTO users (username, firstname, lastname, password) VALUES ($1, $2, $3, $4) RETURNING *';
        connection.query(sqlSearch, [username], async (err, result) => {
            // throw err if found
            if (err)
                throw err;
            if (result.rowCount != 0) {
                // if username already registered
                console.log('User Found');
                return res.sendFile(paths_1.pagesPath + '/userfound.html'); // send redirect file
            }
            else {
                // if username isn't found then create user
                // hash password frist
                const hash = bcrypt.hashSync(password + String(BCRYPT_PASSWORD), parseInt(String(SALT_ROUNDS)));
                // Create new user
                const result = await connection.query(sqlInsert, [
                    username,
                    firstname,
                    lastname,
                    hash,
                ]);
                return res.sendFile(paths_1.pagesPath + '/user-registered.html'); // send redirect file
            }
        }); // connection.query()
        return;
    }); // client.connect()
    // jwt.sign()
    // jwt.verify()
    return;
});
exports.default = register;
