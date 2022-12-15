import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

const app = express();
const address = '0.0.0.0:3000';

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});