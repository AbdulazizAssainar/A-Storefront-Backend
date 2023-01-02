"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const catagory_1 = require("../../models/catagory");
const catagory = new catagory_1.CatagoryStore();
describe('Catagory Model', () => {
    it('should have an index method', () => {
        expect(catagory.index).toBeDefined();
    });
    it('index method should return a list of catagories', async () => {
        const result = await catagory.index();
        expect(result).toEqual([]);
    });
});
