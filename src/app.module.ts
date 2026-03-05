import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './modules/user/user.module';
import { TasksModule } from './modules/task/task.module';

import { User } from './users/user.entity';
import { Task } from './tasks/task.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'todo.sqlite',
      entities: [User, Task],
      synchronize: true, // development only
    }),
    UsersModule,
    TasksModule,
  ],
})
export class AppModule {}
