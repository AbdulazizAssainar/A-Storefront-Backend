"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const signup_1 = __importDefault(require("./api/signup"));
const path_1 = __importDefault(require("path"));
const paths_1 = require("../utilities/paths");
const signup_2 = __importDefault(require("./api/signup"));
const routes = (0, express_1.default)();
exports.routes = routes;
routes.get('/', function (req, res) {
    res.sendFile(path_1.default.join(paths_1.pagesPath, '/index.html'));
    return;
});
routes.use('/signup', signup_2.default);
routes.use('/login', signup_1.default);
