"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = require("./routes");
const app = (0, express_1.default)();
const address = 'localhost:3000';
app.use(body_parser_1.default.json());
app.get('/', function (req, res) {
    return res.redirect('/api');
});
app.use('/api', routes_1.routes);
app.listen(3000, function () {
    console.log(`starting app on: http://${address}`);
});
