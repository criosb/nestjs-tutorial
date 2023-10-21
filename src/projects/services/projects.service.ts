import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectsEntity } from '../entities/projects.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ProjectDTO, UpdateProjectDTO } from '../dto/project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectsEntity)
    private readonly projectRepository: Repository<ProjectsEntity>,
  ) {}

  public async createProject(body: ProjectDTO): Promise<ProjectsEntity> {
    try {
      return await this.projectRepository.save(body);
    } catch (error) {
      throw new Error(error);
    }
  }

  public async findProjects(): Promise<ProjectsEntity[]> {
    try {
      return await this.projectRepository.find();
    } catch (error) {
      throw new Error(error);
    }
  }

  public async findProjectById(id: string): Promise<ProjectsEntity> {
    try {
      return await this.projectRepository
        .createQueryBuilder('project')
        .where({ id })
        .getOne();
    } catch (error) {
      throw new Error(error);
    }
  }

  public async findProjectByName(name: string): Promise<ProjectsEntity> {
    try {
      return await this.projectRepository
        .createQueryBuilder('project')
        .where({ name })
        .getOne();
    } catch (error) {
      throw new Error(error);
    }
  }

  public async updateProject(
    body: UpdateProjectDTO,
    id: string,
  ): Promise<UpdateResult> {
    try {
      const result: UpdateResult = await this.projectRepository.update(
        id,
        body,
      );
      if (result.affected === 0) {
        throw new Error('Project not found');
      }
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async deleteProject(id: string): Promise<DeleteResult> {
    try {
      const result: DeleteResult = await this.projectRepository.delete(id);
      if (result.affected === 0) {
        throw new Error('Project not found');
      }
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
}
