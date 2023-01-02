import { CatagoryStore } from '../../models/catagory';

const catagory = new CatagoryStore();

describe('Catagory Model', () => {
  it('should have an index method', () => {
    expect(catagory.index).toBeDefined();
  });
  it('index method should return a list of catagories', async () => {
    const result = await catagory.index();
    expect(result).toEqual([]);
  });
});
