import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ACCESS_LEVEL_KEY, PUBLIC_KEY, ROLES } from '../../constants';
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
    const { userId, userRole } = req;

    if (userRole === ROLES.ADMIN) {
      return true;
    }

    const user = await this.userService.getUserById(userId);

    console.log(user);

    const assignedProject = user.projects.find(
      (project) => project.project.id === req.params.projectId,
    );

    console.log(assignedProject);

    if (!assignedProject) {
      throw new UnauthorizedException(`Can't access to unassigned project`);
    }

    const accessLevel = this.reflector.get<number>(
      ACCESS_LEVEL_KEY,
      context.getHandler(),
    );

    if (accessLevel !== assignedProject.accessLevel) {
      throw new UnauthorizedException(
        `Doesn't have the right access level for this project operation`,
      );
    }

    return true;
  }
}
