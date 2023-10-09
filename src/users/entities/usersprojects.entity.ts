import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { ACCESS_LEVEL } from '../../constants/roles';
import { UsersEntity } from './users.entity';
import { ProjectsEntity } from '../../projects/entities/projects.entities';

@Entity({ name: 'users_projects' })
export class UsersProjectsEntity extends BaseEntity {
  @Column({ type: 'enum', enum: ACCESS_LEVEL, default: ACCESS_LEVEL.MANTAINER })
  accessLevel: ACCESS_LEVEL;

  @ManyToOne(() => UsersEntity, (user) => user.projects)
  user: UsersEntity;

  @ManyToOne(() => ProjectsEntity, (project) => project.users)
  project: ProjectsEntity;
}
