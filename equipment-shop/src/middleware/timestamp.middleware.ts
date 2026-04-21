import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class TimeStampMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const timestamp = new Date().toISOString()
    req.requestDetails = {
        ...req.requestDetails,
        timestamp
    }
    res.json(req.requestDetails) // Passing result to controller
    //next();// Omitting next() since request/response cycle ends here, otherwise I'd have to send @Req in the controller to access the object built out in the middleware
  }
}
