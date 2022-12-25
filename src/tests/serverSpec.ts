import express from 'express'
import login from '../routes/api/login'
import signup from '../routes/api/register'

const app = express.Router()

describe('Testing Server', () => {
  it('index route run with status code 200 ', () => {
    app.get('/', async (req, res) => {
      await expect(res.statusCode).toEqual(200)
    })
  })
  it('login route run with status code 200 ', () => {
    login.get('/login', async (req, res) => {
      await expect(res.statusCode).toEqual(200)
    })
  })
  it('signup route run with status code 200 ', () => {
    signup.get('/signup', async (req, res) => {
      await expect(res.statusCode).toEqual(200)
    })
    return
  })
})
