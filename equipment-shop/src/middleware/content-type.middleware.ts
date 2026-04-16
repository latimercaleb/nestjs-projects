import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class ContentTypeMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const contentType = req.headers['content-type'];
    if (!contentType || contentType !== 'application/json') {
      return res.status(415).json({ message: 'Content-Type must be application/json' });
    }
    next();
  }
}
