import { Column, Entity } from 'typeorm';
import { BaseEntity } from 'src/config/base.entity';
import { IProject } from 'src/interfaces/project.interface';

@Entity({ name: 'projects' })
export class ProjectsEntity extends BaseEntity implements IProject {
  @Column()
  name: string;

  @Column()
  description: string;
}
