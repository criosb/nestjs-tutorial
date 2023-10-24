import { Module } from '@nestjs/common';
import { ProjectsService } from './services';
import { ProjectsController } from './controllers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsEntity } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectsEntity])],
  providers: [ProjectsService],
  controllers: [ProjectsController],
})
export class ProjectsModule {}
