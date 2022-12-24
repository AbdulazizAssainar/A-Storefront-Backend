"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const authenticate_1 = __importDefault(require("./api/authenticate"));
const register_1 = __importDefault(require("./api/register"));
const paths_1 = require("../utilities/paths");
const routes = (0, express_1.default)();
exports.routes = routes;
routes.get('/', function (req, res) {
    res.send('Index route');
});
routes.get('/pages/style/main.css', (req, res) => {
    res.sendFile(paths_1.pagesPath + '/style/main.css');
});
routes.get('/pages/style/registration.css', (req, res) => {
    res.sendFile(paths_1.pagesPath + '/style/registration.css');
});
routes.use('/login', authenticate_1.default);
routes.use('/register', register_1.default);
