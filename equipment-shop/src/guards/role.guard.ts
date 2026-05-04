import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const reflectorRole = this.reflector.get('roles', context.getHandler())
    if (!reflectorRole || !reflectorRole.includes('admin')){ // Fetching role via metadata
      throw new ForbiddenException('Access Denied!')
    }
    return true;
  }
}
