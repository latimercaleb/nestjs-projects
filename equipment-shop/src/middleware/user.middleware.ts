import { Injectable, NestMiddleware } from '@nestjs/common';
import {NextFunction, Request, Response} from 'express'
import { AppService } from '../app.service';
// import bcrypt from 'bcrypt';
import { UserDTO } from '../DTO/user.dto';
import { validate } from 'class-validator';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(private appService: AppService){}

  async use(req: Request, res: Response, next: NextFunction) {
    const bcrypt = require('bcrypt') // Can use standard import or require here
    if (req.body  && req.body.name) {
      req.body.name  = req.body.name.toUpperCase()
    } if (req.body && req.body.password) {
      const testUserValidation = new UserDTO(req.body.name, req.body.password, new Date().toISOString())
      const validationErrors = await validate(testUserValidation)
      if (validationErrors.length > 0) {
        return res.status(400).json(validationErrors); // Manually stop the request if DTO fails validation scheme, this is required since dto is being used in middleware
      } else {
        const passwordHash =  await bcrypt.hash(req.body.password, 10)
        const user: UserDTO = new UserDTO(req.body.name, passwordHash, new Date().toISOString())
        this.appService.createUser(user) // Note: Adding this here circumvents dto validation in the controller or pipe layer
      }

    }
   next();
  }
}
