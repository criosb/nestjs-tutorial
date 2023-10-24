import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UsersEntity, UsersProjectsEntity } from '../entities';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UpdateUserDTO, UserDTO, UserProjectAssignmentDTO } from '../dto';
import { ErrorManager } from '../../utils';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
    @InjectRepository(UsersProjectsEntity)
    private readonly usersProjectsRepository: Repository<UsersProjectsEntity>,
  ) {}

  public async createUser(body: UserDTO): Promise<UsersEntity> {
    try {
      const user: UsersEntity = this.userRepository.create(body);
      const hashedPassword: string = await bcrypt.hash(
        user.password,
        +process.env.HASH_SALT,
      );
      user.password = hashedPassword;
      const createdUser: UsersEntity = await this.userRepository.save(user);
      if (!createdUser) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Unable to create user',
        });
      }
      return createdUser;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async getAllUsers(): Promise<UsersEntity[]> {
    try {
      const users: UsersEntity[] = await this.userRepository.find();
      if (users.length === 0) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Users not found',
        });
      }
      return users;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async getUserById(id: string): Promise<UsersEntity> {
    try {
      const user: UsersEntity = await this.userRepository
        .createQueryBuilder('user')
        .where({ id })
        .leftJoinAndSelect('user.projects', 'projects')
        .leftJoinAndSelect('projects.project', 'project')
        .getOne();
      if (!user) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'User not found',
        });
      }
      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async updateUser(
    body: UpdateUserDTO,
    id: string,
  ): Promise<UpdateResult> {
    try {
      const result: UpdateResult = await this.userRepository.update(id, body);
      if (result.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Unable to update user',
        });
      }
      return result;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async deleteUser(id: string): Promise<DeleteResult> {
    try {
      const result: DeleteResult = await this.userRepository.delete(id);
      if (result.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Unable to delete user',
        });
      }
      return result;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async assignUserToProject(
    body: UserProjectAssignmentDTO,
  ): Promise<UsersProjectsEntity> {
    try {
      const userProject: UsersProjectsEntity =
        await this.usersProjectsRepository.save(body);
      if (!userProject) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Unable to assign user to project',
        });
      }
      return userProject;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
