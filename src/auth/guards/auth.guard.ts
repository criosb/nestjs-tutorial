import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { AUTH_HEADER_KEY, PUBLIC_KEY } from '../../constants';
import { UsersService } from '../../users/services';
import { AuthService } from '../services';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>(
      PUBLIC_KEY,
      context.getHandler(),
    );

    if (isPublic) {
      return true;
    }

    const req = context.switchToHttp().getRequest<Request>();
    const token = req.header(AUTH_HEADER_KEY);

    if (!token || Array.isArray(token)) {
      throw new UnauthorizedException('Token not found');
    }

    const decodedToken = this.authService.decodeToken(token);

    if (!decodedToken) {
      throw new UnauthorizedException('Invalid token');
    }

    if (decodedToken.isExpired) {
      throw new UnauthorizedException('Token expired');
    }

    const user = await this.userService.getUserById(decodedToken.sub);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    req.idUser = user.id;
    req.roleUser = user.role;

    return true;
  }
}
