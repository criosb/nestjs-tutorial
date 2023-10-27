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
import { ProjectsService } from '../services';
import { ProjectDTO, UpdateProjectDTO } from '../dto';
import { AuthGuard, RolesGuard, AccessLevelGuard } from '../../auth/guards';
import { AccessLevel, AdminAccess } from '../../auth/decorators';
import { ACCESS_LEVEL } from '../../constants';

@Controller('projects')
@UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}

  @Post('')
  @AdminAccess()
  public async createProject(@Body() body: ProjectDTO) {
    return await this.projectService.createProject(body);
  }

  @Get('all')
  public async findAllProjects() {
    return await this.projectService.findProjects();
  }

  @Get(':projectId')
  public async findProjectById(@Param('projectId') projectId: string) {
    return await this.projectService.findProjectById(projectId);
  }

  @Patch(':projectId')
  @AccessLevel(ACCESS_LEVEL.OWNER)
  public async updateProject(
    @Body() body: UpdateProjectDTO,
    @Param('projectId') projectId: string,
  ) {
    return await this.projectService.updateProject(body, projectId);
  }

  @Delete(':projectId')
  @AccessLevel(ACCESS_LEVEL.OWNER)
  public async deleteProject(@Param('projectId') projectId: string) {
    return await this.projectService.deleteProject(projectId);
  }
}
