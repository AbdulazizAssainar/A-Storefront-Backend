import { Order, OrderList } from '../../models/order'

const order = new OrderList()

describe('Order Model', () => {
  beforeAll(function() {
      //jasmine.DEFAULT_TIMEOUT_INTERVAL = 999999;
  })
  it('should have an index method', () => {
    expect(order.index).toBeDefined()
  })
  it('index method should return a list of orders', async () => {
    const result = await order.index()
    expect(result).toEqual([])
  })
})
