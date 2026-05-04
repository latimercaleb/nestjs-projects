import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AppController } from '../app.controller';
import { UserController } from '../user/user.controller';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('Guard tapped')
    const activeController = context.getClass();
    if(activeController.name !== 'UserController'){
      throw new UnauthorizedException('Inaccessible outside of user controller')
    }
    const [req, res] = context.getArgs();
    const httpContext = context.switchToHttp().getRequest();
    console.log(`User agent from http context: ${httpContext.headers['user-agent']}`)
    console.info(`Request query is: `, req.query)
    res.cookie('cookie', 'some_cookie_value') // NOTE: This should not typically be done inside of a guard, interceptors or middleware should handle cookies, guards should only handle auth
    console.info(`Headers avail are: ${JSON.stringify(res.getHeaders())}`)
    return true; // Returning false defaults to a 403 Forbidden response, true allows the request to proceed
  }
}
