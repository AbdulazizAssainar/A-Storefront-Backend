"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routes_1 = require("../../routes");
describe('Testing index route', () => {
    it('run with status code 200 ', () => {
        routes_1.routes.get('/', async (req, res) => {
            await expect(res.statusCode).toEqual(200);
        });
    });
});
