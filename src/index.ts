import {NextFunction, Request, Response} from 'express';
import {Pool as PoolPg} from 'pg';

import {Settings} from './Types/Settings';

export * from './Types';
export type Pool = PoolPg;

declare global {
  namespace Express {
    interface Request {
      postgres: PoolPg;
    }
  }
}

export default (settings: Settings) => (req: Request, res: Response, next: NextFunction) => {
  const db = new PoolPg({ connectionString: settings.connectionString });

  req.postgres = db;

  // When we get a sigterm, lets close our database pool
  process.on('SIGTERM', async () => {
    await db.end();
    console.log('Database Disconnected - Happy to shutdown');
    process.exit(0);
  });

  next();
};
