"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const sign_1 = __importDefault(require("./api/sign"));
const path_1 = __importDefault(require("path"));
const paths_1 = require("../utilities/paths");
const routes = (0, express_1.default)();
exports.routes = routes;
routes.use(body_parser_1.default.json());
routes.get('/', function (req, res) {
    res.sendFile(path_1.default.join(paths_1.pagesPath, '/index.html'));
});
routes.use('/Sign', sign_1.default);
