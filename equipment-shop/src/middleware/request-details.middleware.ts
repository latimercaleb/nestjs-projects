import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class RequestDetailsMiddleware implements NestMiddleware {
    // Middleware to splice request details and pass to timestamp middleware
  use(req: any, res: any, next: () => void) {
    console.log('In')
    const {method, url, body, headers} = req
    const requestData = {
        method,
        url,
        body,
        userAgent: headers['user-agent'],
        contentType: headers['content-type']
    }
    res.json(requestData)
    console.log('Out')
    next();
  }
}
