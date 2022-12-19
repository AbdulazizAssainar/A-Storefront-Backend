"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const signup = (0, express_1.default)();
signup.get('/', function (req, res) {
    res.send('signup route');
});
exports.default = signup;
