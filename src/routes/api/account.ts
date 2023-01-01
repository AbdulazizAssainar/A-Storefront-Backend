import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
const { TOKEN_SECRET } = process.env;

const account: express.Application = express();

account.get('/', function (req: Request, res: Response, next) {
  console.log(req.url.split('?')[0].slice(1));

  const authHeader = req.headers.authorization;
  const username = req.url.split('?')[0].slice(1);
  const token = authHeader && authHeader.split(' ')[1];
  let userToken;

  try {
    const tokenParts = token!.split('.');
    const encodedPayload = tokenParts[1];
    const rawPayload = atob(encodedPayload);
    const user = JSON.parse(rawPayload);
    userToken = user.username;
  } catch (err) {
    console.log(err);
  }

  return res.redirect(`/account/${userToken}`);
});

account.get('/:username', function (req: Request, res: Response) {
  authorization(req, res, () => {
    return res.status(200).send('this is your Account');
  });
});

export function authorization(req: Request, res: Response, next: Function) {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) {
    return res.status(401).send('Unauthorized'); // Unauthorized
  }

  var decoded = jwt.verify(token!, TOKEN_SECRET!, (err, user) => {
    if (err != null) {
      return res.status(403).send('Forbidden'); // Forbidden
    }
  });

  const tokenParts = token!.split('.');
  const encodedPayload = tokenParts[1];
  const rawPayload = atob(encodedPayload);
  const user = JSON.parse(rawPayload);
  const userToken = user.username;

  next();
}

export default account;
