"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = require("./routes");
const products_store_1 = __importDefault(require("./handlers/products_store"));
const app = (0, express_1.default)();
const address = 'localhost:3000';
const corsOptions = {
    origin: 'http://test.com',
    OptionSuccessStatus: 200
};
app.use((0, cors_1.default)(corsOptions));
app.use(body_parser_1.default.json());
app.use('/', routes_1.routes);
app.use('/test-cors', (0, cors_1.default)(corsOptions), function (req, res, next) {
    res.json({ msg: 'This is CORS-enabled with middile ware' });
});
(0, products_store_1.default)(app);
app.listen(3000, function () {
    console.log(`starting app on: http://${address}`);
});
