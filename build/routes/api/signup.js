"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const paths_1 = require("../../utilities/paths");
const signup = (0, express_1.default)();
signup.get('/', function (req, res) {
    res.sendFile(path_1.default.join(paths_1.pagesPath, '/signup.html'));
});
exports.default = signup;
