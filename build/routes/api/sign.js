"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const sign = (0, express_1.default)();
sign.use(body_parser_1.default.json());
sign.get('/Sign', function (req, res) {
    res.sendFile(path_1.default.join(__dirname, '../pages/sign.html'));
});
exports.default = sign;
