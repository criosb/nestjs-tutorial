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

  @Get(':id')
  public async findProjectById(@Param('id') id: string) {
    return await this.projectService.findProjectById(id);
  }

  @Patch(':id')
  public async updateProject(
    @Body() body: UpdateProjectDTO,
    @Param('id') id: string,
  ) {
    return await this.projectService.updateProject(body, id);
  }

  @Delete(':id')
  public async deleteProject(@Param('id') id: string) {
    return await this.projectService.deleteProject(id);
  }
}
