import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersEntity } from '../../users/entities';
import { UsersService } from '../../users/services';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  public async validateUser(
    identifier: string,
    password: string,
  ): Promise<UsersEntity> {
    const userByUsername: UsersEntity = await this.usersService.getUserBy({
      key: 'username',
      value: identifier,
    });

    if (userByUsername) {
      const isPasswordValid: boolean = await bcrypt.compare(
        password,
        userByUsername.password,
      );
      if (isPasswordValid) {
        return userByUsername;
      }
    }

    const userByEmail: UsersEntity = await this.usersService.getUserBy({
      key: 'email',
      value: identifier,
    });

    if (userByEmail) {
      const isPasswordValid: boolean = await bcrypt.compare(
        password,
        userByEmail.password,
      );
      if (isPasswordValid) {
        return userByEmail;
      }
    }

    return null;
  }
}
