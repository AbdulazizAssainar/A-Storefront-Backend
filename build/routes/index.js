"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const paths_1 = require("../utilities/paths");
const register_1 = __importDefault(require("./api/register"));
const account_1 = __importDefault(require("./api/account"));
const login_1 = __importDefault(require("./api/login"));
const store_1 = __importDefault(require("./api/store"));
const user_1 = __importDefault(require("./api/user"));
const routes = (0, express_1.default)();
exports.routes = routes;
routes.get('/', function (req, res) {
    res.send('Index route');
});
routes.use('/login', login_1.default);
routes.use('/register', register_1.default);
routes.use('/users', user_1.default);
routes.use('/account', account_1.default);
routes.use('/store', store_1.default);
routes.get('/pages/style/main.css', (req, res) => {
    res.sendFile(paths_1.pagesPath + '/style/main.css');
});
routes.get('/pages/style/registration.css', (req, res) => {
    res.sendFile(paths_1.pagesPath + '/style/registration.css');
});
