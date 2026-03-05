import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Task } from '../../tasks/task.entity';
import { TasksService } from './task.service';
import { TasksController } from './task.controller';
import { UsersModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), UsersModule],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
