import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UsersEntity } from '../../users/entities';
import { UsersService } from '../../users/services';
import { TokenPayload } from '../interfaces';

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

  public signToken({
    payload,
    secret,
    expiresIn,
  }: {
    payload: jwt.JwtPayload;
    secret: string;
    expiresIn: number | string;
  }): string {
    return jwt.sign(payload, secret, { expiresIn });
  }

  public async generateToken(user: UsersEntity): Promise<any> {
    const { id } = user;
    const getUser = await this.usersService.getUserById(id);
    const { role } = getUser;
    const payload: TokenPayload = {
      sub: id,
      role,
    };
    return {
      accessToken: this.signToken({
        payload,
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
      }),
      user,
    };
  }
}
