import {ArgumentMetadata, BadRequestException, Injectable, NestMiddleware, } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express';
@Injectable()
export class LoggingMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
       console.log(`Date of middleware log: ${new Date().toDateString()}`)
       next()
    }
}
