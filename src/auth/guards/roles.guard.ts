import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ADMIN_KEY, PUBLIC_KEY, ROLES, ROLES_KEY } from '../../constants';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get<boolean>(
      PUBLIC_KEY,
      context.getHandler(),
    );

    if (isPublic) {
      return true;
    }

    const req = context.switchToHttp().getRequest<Request>();
    const { userRole } = req;

    if (userRole === ROLES.ADMIN) {
      return true;
    }

    const roles = this.reflector.get<Array<ROLES>>(
      ROLES_KEY,
      context.getHandler(),
    );
    const admin = this.reflector.get<string>(ADMIN_KEY, context.getHandler());

    if (!roles) {
      if (!admin) {
        return true;
      } else if (admin && userRole === admin) {
        return true;
      } else {
        throw new UnauthorizedException('Unauthorized');
      }
    }

    const isAuth = roles.some((role) => role === userRole);

    if (!isAuth) {
      throw new UnauthorizedException('Unauthorized');
    }

    return true;
  }
}
