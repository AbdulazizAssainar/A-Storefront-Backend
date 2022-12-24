import { User, UsersAccount } from '../../models/user'

const user = new UsersAccount()

describe('User Model', () => {
  beforeAll(function() {
      //jasmine.DEFAULT_TIMEOUT_INTERVAL = 999999;
  })
  it('should have an index method', () => {
    expect(user.index).toBeDefined()
  })
  it('index method should return a list of useres account', async () => {
    const result = await user.index()
    expect(result).toEqual([])
  })
})
