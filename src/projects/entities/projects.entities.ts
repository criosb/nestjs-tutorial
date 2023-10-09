import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/config/base.entity';
import { IProject } from 'src/interfaces/project.interface';
import { UsersProjectsEntity } from 'src/users/entities/usersprojects.entity';

@Entity({ name: 'projects' })
export class ProjectsEntity extends BaseEntity implements IProject {
  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => UsersProjectsEntity, (userProject) => userProject.project)
  users: UsersProjectsEntity[];
}
