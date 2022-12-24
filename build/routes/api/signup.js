"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("../../database"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { POSTGRES_HOST, POSTGRES_DB, POSTGRES_TEST_DB, POSTGRES_USER, POSTGRES_PASSWORD, ENV, BCRYPT_PASSWORD, SALT_ROUNDS, TOKEN_SECRET } = process.env;
const signup = (0, express_1.default)();
const bcrypt = require("bcrypt");
signup.use(express_1.default.json());
signup.get('/', async function (req, res) {
    const username = String(req.query.username);
    const firstName = String(req.query.firstName);
    const lastName = String(req.query.lastName);
    const password = String(req.query.password);
    database_1.default.connect(async (err, connection) => {
        if (username == undefined)
            return res.send("username is undefined");
        if (firstName == undefined)
            return res.send("firstName is undefined");
        if (lastName == undefined)
            return res.send("lastName is undefined");
        if (password == undefined)
            return res.send("password is undefined");
        const sqlSearch = `SELECT * FROM users WHERE username = ${username}`;
        const sqlInsert = "INSERT INTO users (username, firstName, lastName, password) VALUES ($1, $2, $3, $4) RETURNING *";
        connection.query(sqlSearch, async (err, result) => {
            if (err)
                throw (err);
            console.log("Search Results");
            console.log(result.rowCount);
            if (result.rowCount != 0) {
                console.log("User already exists");
                connection.release();
                res.sendStatus(409);
            }
            else {
                const hash = bcrypt.hashSync(password + String(BCRYPT_PASSWORD), parseInt(String(SALT_ROUNDS)));
                const result = await connection.query(sqlInsert, [username, firstName, lastName, hash]);
                console.log("Insert Results");
                console.log(result.rows);
            }
        }); //end of connection.query()
        //end of connection.query()
    }); //end of client.connect()
    //jwt.sign()
    //jwt.verify()
});
exports.default = signup;
