import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProjectsService } from '../services';
import { ProjectDTO, UpdateProjectDTO } from '../dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}

  @Post('')
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
  public async updateProject(
    @Body() body: UpdateProjectDTO,
    @Param('projectId') projectId: string,
  ) {
    return await this.projectService.updateProject(body, projectId);
  }

  @Delete(':projectId')
  public async deleteProject(@Param('projectId') projectId: string) {
    return await this.projectService.deleteProject(projectId);
  }
}
