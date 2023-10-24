import { Module } from '@nestjs/common';
import { UsersService } from './services';
import { UsersController } from './controllers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity, UsersProjectsEntity } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity, UsersProjectsEntity])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
