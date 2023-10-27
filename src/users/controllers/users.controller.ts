import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../services';
import { UpdateUserDTO, UserDTO, UserProjectAssignmentDTO } from '../dto';
import { ACCESS_LEVEL, ROLES } from '../../constants';
import { UsersEntity } from '../entities';
import { ProjectsEntity } from '../../projects/entities';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { AdminAccess, Roles } from '../../auth/decorators';
import { RolesGuard } from '../../auth/guards';

@Controller('users')
@UseGuards(AuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('')
  @AdminAccess()
  public async createUser(@Body() body: UserDTO) {
    return await this.userService.createUser(body);
  }

  @Post(':userId/projects/:projectId')
  @AdminAccess()
  public async assignUserToProject(
    @Body() { accessLevel }: { accessLevel: ACCESS_LEVEL },
    @Param('userId') userId: string,
    @Param('projectId') projectId: string,
  ) {
    const user: UsersEntity = new UsersEntity();
    user.id = userId;
    const project: ProjectsEntity = new ProjectsEntity();
    project.id = projectId;
    const body: UserProjectAssignmentDTO = {
      user,
      project,
      accessLevel,
    };
    return await this.userService.assignUserToProject(body);
  }

  @Get('all')
  @Roles(ROLES.BASIC)
  public async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Get(':userId')
  @Roles(ROLES.BASIC)
  public async getUserById(@Param('userId') userId: string) {
    return await this.userService.getUserById(userId);
  }

  @Patch(':userId')
  @AdminAccess()
  public async updateUser(
    @Body() body: UpdateUserDTO,
    @Param('userId') userId: string,
  ) {
    return await this.userService.updateUser(body, userId);
  }

  @Delete(':userId')
  @AdminAccess()
  public async deleteUser(@Param('userId') userId: string) {
    return await this.userService.deleteUser(userId);
  }
}
