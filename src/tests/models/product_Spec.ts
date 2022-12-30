import { ProductStore } from '../../models/product';

const store = new ProductStore();

describe('Product Model', () => {
  beforeAll(function () {
    // jasmine.DEFAULT_TIMEOUT_INTERVAL = 999999;
  });
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });
  it('index method should return a list of products', async () => {
    const result = await store.index();
    expect(result).toEqual([]);
  });
});
