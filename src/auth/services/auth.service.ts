import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
}
