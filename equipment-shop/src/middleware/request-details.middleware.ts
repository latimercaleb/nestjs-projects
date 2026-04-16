import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class RequestDetailsMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const {method, url, body, headers} = req
    const requestData = {
        method,
        url,
        body,
        userAgent: headers['user-agent'],
        constentType: headers['content-type']
    }
    res.json(requestData)
    next();
  }
}
