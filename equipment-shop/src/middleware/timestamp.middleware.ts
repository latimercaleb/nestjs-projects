import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class TimeStampMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const timestamp = new Date().toISOString()
    console.log(`Request received at: ${timestamp}`)
    const requestData = {
        ... req,
        timestamp
    }
    res.json(requestData)
    next();
  }
}
