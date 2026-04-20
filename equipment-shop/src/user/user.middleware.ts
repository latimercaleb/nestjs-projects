import { Injectable, NestMiddleware } from '@nestjs/common';

// TODO: Move me to the middleware folder later and then add some logging on user additions to app service
@Injectable()
export class UserMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    next();
  }
}
