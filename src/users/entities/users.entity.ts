import { BaseEntity } from 'src/config/base.entity';
import { IUser } from 'src/interfaces/users.interface';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'users' })
export class UsersEntity extends BaseEntity implements IUser {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  role: string;
}
