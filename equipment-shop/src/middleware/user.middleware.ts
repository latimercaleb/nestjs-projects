import { Injectable, NestMiddleware } from '@nestjs/common';
import {NextFunction, Request, Response} from 'express'
import { AppService } from '../app.service';
import * as bcrypt from 'bcrypt';
import { UserDTO } from '../DTO/user.dto';
// TODO: Move me to the middleware folder later and then add some logging on user additions to app service
// Test implementation, look into difference of using class instance vs static object
@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(private appService: AppService){}
  async use(req: Request, res: Response, next: NextFunction) {
    if (req.body  && req.body.name) {
      req.body.name  = req.body.name.toUpperCase()
    } if (req.body && req.body.password) {
      const passwordHash = await bcrypt.hash(req.body.password, 10)
      const user: UserDTO = new UserDTO(req.body.name, passwordHash, new Date().toISOString())
      this.appService.createUser(user)
    }
    next();
  }
}
