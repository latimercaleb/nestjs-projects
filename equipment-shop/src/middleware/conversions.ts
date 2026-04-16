import { NextFunction, Request, Response } from 'express';

export function convertMiddleware (req: Request, res: Response, next: NextFunction) {
    console.log('Convert Middleware method hit')
    if(req.body && typeof req.body === 'object') {
        res.status(202).json(req.body)
        return
    }
    next();
  }