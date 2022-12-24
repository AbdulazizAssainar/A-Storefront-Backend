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
const { BCRYPT_PASSWORD, SALT_ROUNDS, TOKEN_SECRET } = process.env;
const signup = (0, express_1.default)();
const bcrypt = require("bcrypt");
signup.use(express_1.default.json());
signup.get('/pages/style.css', (req, res) => {
    res.sendFile(paths_1.pagesPath + '/registration.html');
});
signup.get('/', async function (req, res) {
    //get some data from url
    const username = String(req.query.username);
    const firstName = String(req.query.firstName);
    const lastName = String(req.query.lastName);
    const password = String(req.query.password);
    database_1.default.connect(async (err, connection) => {
        // if any data in undefined return error
        if (username == "undefined")
            return res.sendFile(paths_1.pagesPath + '/registration.html');
        if (firstName == "undefined")
            return res.send("firstName is undefined");
        if (lastName == "undefined")
            return res.send("lastName is undefined");
        if (password == "undefined")
            return res.send("password is undefined");
        const sqlSearch = "SELECT * FROM users WHERE username = $1";
        const sqlInsert = "INSERT INTO users (username, firstName, lastName, password) VALUES ($1, $2, $3, $4) RETURNING *";
        connection.query(sqlSearch, [username], async (err, result) => {
            // throw err if found  
            if (err)
                throw (err);
            if (result.rowCount != 0) { // if username already registered
                console.log("User Founeds");
                return res.sendFile(paths_1.pagesPath + '/userfound.html'); // sen redirect file
            }
            else { // if username isn't found then create user
                // hash password frist
                const hash = bcrypt.hashSync(password + String(BCRYPT_PASSWORD), parseInt(String(SALT_ROUNDS)));
                // Create new user
                const result = await connection.query(sqlInsert, [username, firstName, lastName, hash]);
                return res.send(`user ${username} signed up`);
            }
        }); //connection.query()
    }); //client.connect()
    //jwt.sign()
    //jwt.verify()
});
exports.default = signup;
