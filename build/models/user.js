"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authenticate = exports.CreateUser = exports.UsersAccount = void 0;
const database_1 = __importDefault(require("../database"));
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
dotenv_1.default.config();
const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
class UsersAccount {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot get users ${err}`);
        }
    }
}
exports.UsersAccount = UsersAccount;
class CreateUser {
    constructor(username, firstName, lastName, password) {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
    }
    async create(u) {
        try {
            u.username = this.username;
            u.firstName = this.firstName;
            u.lastName = this.lastName;
            u.password = this.password;
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO users (username, firstName, lastName, password) VALUES ($1, $2, $3, $4) RETURNING *';
            const getSql = 'GET * FROM users';
            const hash = bcrypt_1.default.hashSync(u.password + String(BCRYPT_PASSWORD), parseInt(String(SALT_ROUNDS)));
            const result = await conn.query(sql, [
                u.username,
                u.firstName,
                u.lastName,
                hash,
            ]);
            const getall = await conn.query(getSql);
            const user = result.rows[0];
            conn.release();
            return user;
        }
        catch (user) {
            throw new Error(`unable create user (${u.username}): ${user}`);
        }
    }
}
exports.CreateUser = CreateUser;
class Authenticate {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
    async authenticate() {
        const conn = await database_1.default.connect();
        const sql = 'SELECT password_digest FROM users WHERE username=($1)';
        const result = await conn.query(sql, [this.username]);
        console.log(this.password + BCRYPT_PASSWORD);
        if (result.rows.length > 0) {
            const user = result.rows[0];
            console.log(user);
            if (bcrypt_1.default.compareSync(this.password + BCRYPT_PASSWORD, user.password_digest)) {
                return user;
            }
        }
        return null;
    }
}
exports.Authenticate = Authenticate;
