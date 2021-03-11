import { NextFunction, Request, Response } from 'express';
import { Pool } from 'pg';

import { Settings } from './Types/Settings';

export * from './Types';
declare global {
  namespace Express {
    interface Request {
      postgres: Pool;
    }
  }
}

export default (settings: Settings) => (req: Request, res: Response, next: NextFunction) => {
  const db = new Pool({ connectionString: settings.connectionString });

  req.postgres = db;

  next();
};
