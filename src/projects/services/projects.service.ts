import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectsEntity } from '../entities/projects.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ProjectDTO, UpdateProjectDTO } from '../dto/project.dto';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectsEntity)
    private readonly projectRepository: Repository<ProjectsEntity>,
  ) {}

  public async createProject(body: ProjectDTO): Promise<ProjectsEntity> {
    try {
      const project: ProjectsEntity = await this.projectRepository.save(body);
      if (!project) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Unable to create project',
        });
      }
      return project;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findProjects(): Promise<ProjectsEntity[]> {
    try {
      const projects: ProjectsEntity[] = await this.projectRepository.find();
      if (projects.length === 0) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Projects not found',
        });
      }
      return projects;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findProjectById(id: string): Promise<ProjectsEntity> {
    try {
      const project: ProjectsEntity = await this.projectRepository
        .createQueryBuilder('project')
        .where({ id })
        .leftJoinAndSelect('project.users', 'users')
        .leftJoinAndSelect('users.user', 'user')
        .getOne();
      if (!project) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Project not found',
        });
      }
      return project;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findProjectByName(name: string): Promise<ProjectsEntity> {
    try {
      const project: ProjectsEntity = await this.projectRepository
        .createQueryBuilder('project')
        .where({ name })
        .getOne();
      if (!project) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Project not found',
        });
      }
      return project;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
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
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Unable to update project',
        });
      }
      return result;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async deleteProject(id: string): Promise<DeleteResult> {
    try {
      const result: DeleteResult = await this.projectRepository.delete(id);
      if (result.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Unable to delete project',
        });
      }
      return result;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
