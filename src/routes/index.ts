import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import login from './api/signup'
import path from 'path'
import { pagesPath } from '../utilities/paths'
import signup from './api/signup'

const routes: express.Application = express();

routes.get('/', function (req: Request, res: Response) {
  res.sendFile(path.join(pagesPath, '/index.html'));
  return;
});

routes.use('/signup', signup);
routes.use('/login', login);

export { routes }
