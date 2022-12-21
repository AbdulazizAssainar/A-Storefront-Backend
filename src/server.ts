import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { routes } from './routes'
import product_routes from './handlers/products_store'

const app: express.Application = express()
const address: string = 'localhost:3000'

const corsOptions = {
  origin: 'http://test.com',
  OptionSuccessStatus: 200 
}

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use('/', routes)
app.use('/test-cors', cors(corsOptions), function(req, res, next) {
  res.json({msg:'This is CORS-enabled with middile ware'})
})

product_routes(app)

app.listen(3000, function () {
  console.log(`starting app on: http://${address}`)
})
