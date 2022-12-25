"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const products_ordered_1 = require("../../models/products_ordered");
const ordered = new products_ordered_1.OrderedProductList();
describe('Ordered Products Model', () => {
    beforeAll(function () {
        // jasmine.DEFAULT_TIMEOUT_INTERVAL = 999999;
    });
    it('should have an index method', () => {
        expect(ordered.index).toBeDefined();
    });
    it('index method should return a list of ordered products', async () => {
        const result = await ordered.index();
        expect(result).toEqual([]);
    });
    return;
});
