import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../config';
import { IProject } from '../../interfaces';
import { UsersProjectsEntity } from '../../users/entities';

@Entity({ name: 'projects' })
export class ProjectsEntity extends BaseEntity implements IProject {
  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => UsersProjectsEntity, (userProject) => userProject.project)
  users: UsersProjectsEntity[];
}
