import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { TasksService } from './task.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(Number(id));
  }

  @Post()
  create(@Body() body: any) {
    const { userId, name, description } = body;
    if (userId) {
      return this.tasksService.createForUser(Number(userId), {
        name,
        description,
      });
    }
    // Create task without user association
    return this.tasksService.create({
      name,
      description,
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.tasksService.update(Number(id), body);
  }

  @Patch(':id/complete')
  complete(@Param('id') id: string) {
    return this.tasksService.markCompleted(Number(id));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(Number(id));
  }
}
