import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  ACCESS_LEVEL_KEY,
  ADMIN_KEY,
  PUBLIC_KEY,
  ROLES,
  ROLES_KEY,
} from '../../constants';
import { Request } from 'express';
import { UsersService } from '../../users/services';

@Injectable()
export class AccessLevelGuard implements CanActivate {
  constructor(
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
    const { idUser, roleUser } = req;

    if (roleUser === ROLES.ADMIN) {
      return true;
    }

    const roles = this.reflector.get<Array<keyof typeof ROLES>>(
      ROLES_KEY,
      context.getHandler(),
    );
    const admin = this.reflector.get<string>(ADMIN_KEY, context.getHandler());

    if (!roles) {
      if (!admin) {
        return true;
      } else if (admin && roleUser === admin) {
        return true;
      } else {
        throw new UnauthorizedException(`Doesn't have access to this resource`);
      }
    }

    const user = await this.userService.getUserById(idUser);

    const assignedProject = user.projects.find(
      (project) => project.project.id === req.params.projectId,
    );

    if (!assignedProject) {
      throw new UnauthorizedException(`Doesn't have access to this project`);
    }

    const accessLevel = this.reflector.get<number>(
      ACCESS_LEVEL_KEY,
      context.getHandler(),
    );

    if (accessLevel !== assignedProject.accessLevel) {
      throw new UnauthorizedException(`Doesn't have access to this project`);
    }

    return true;
  }
}
