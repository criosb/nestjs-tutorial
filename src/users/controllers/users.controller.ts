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
import { ACCESS_LEVEL } from '../../constants';
import { UsersEntity } from '../entities';
import { ProjectsEntity } from '../../projects/entities';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { PublicAccess } from '../../auth/decorators/public.decorator';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('')
  public async createUser(@Body() body: UserDTO) {
    return await this.userService.createUser(body);
  }

  @Post(':id/projects/:projectId')
  public async assignUserToProject(
    @Body() { accessLevel }: { accessLevel: ACCESS_LEVEL },
    @Param('id') id: string,
    @Param('projectId') projectId: string,
  ) {
    const user: UsersEntity = new UsersEntity();
    user.id = id;
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
  public async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  @PublicAccess()
  public async getUserById(@Param('id') id: string) {
    return await this.userService.getUserById(id);
  }

  @Patch(':id')
  public async updateUser(
    @Body() body: UpdateUserDTO,
    @Param('id') id: string,
  ) {
    return await this.userService.updateUser(body, id);
  }

  @Delete(':id')
  public async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }
}
