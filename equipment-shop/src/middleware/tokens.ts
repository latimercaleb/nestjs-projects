import {ArgumentMetadata, BadRequestException, Injectable, NestMiddleware} from '@nestjs/common'
import {NextFunction, Request, Response} from 'express'
@Injectable()
export class TokenMiddleware implements NestMiddleware {
  private readonly validTokenStore = ['t1', 't2', 't3']

  private isValidToken(token: string): boolean {
    return this.validTokenStore.includes(token)
  }

  use(req: Request, res: Response, next: NextFunction) {
    const tkn = req.headers.authorization
    if (!tkn || !this.isValidToken(tkn)){
        return res.status(401).json({message: 'Not Authorized'})
    }
    req['token'] = tkn;
    console.log(`Date of middleware log: ${new Date().toDateString()}`)
    console.log(req)
    next()
  }
}
