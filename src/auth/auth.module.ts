import { Global, Module } from '@nestjs/common';
import { AuthService } from './services';
import { AuthController } from './controllers';
import { UsersService } from '../users/services';
import { UsersModule } from 'src/users';

@Global()
@Module({
  imports: [UsersModule],
  providers: [AuthService, UsersService],
  controllers: [AuthController],
})
export class AuthModule {}
