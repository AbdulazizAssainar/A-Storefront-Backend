import express, { Request, Response } from 'express';
import path from 'path';
import { pagesPath } from '../../utilities/paths';

const signup: express.Application = express();

signup.get('/', function (req: Request, res: Response) {
  res.sendFile(path.join(pagesPath, '/signup.html'));
});

export default signup;
