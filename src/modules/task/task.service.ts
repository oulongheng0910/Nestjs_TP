import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../../tasks/task.entity';
import { UsersService } from '../user/user.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepo: Repository<Task>,
    private usersService: UsersService,
  ) {}

  async createForUser(userId: number, taskData: Partial<Task>) {
    const user = await this.usersService.findOne(userId);
    if (!user) throw new NotFoundException('User not found');

    const task = this.tasksRepo.create({
      ...taskData,
      user,
    });
    return this.tasksRepo.save(task);
  }

  findAll() {
    return this.tasksRepo.find({ relations: ['user'] });
  }

  findOne(id: number) {
    return this.tasksRepo.findOne({ where: { id }, relations: ['user'] });
  }

  async update(id: number, updateData: Partial<Task>) {
    const existing = await this.findOne(id);
    if (!existing) throw new NotFoundException('Task not found');

    await this.tasksRepo.update(id, updateData);
    return this.findOne(id);
  }

  async markCompleted(id: number) {
    const existing = await this.findOne(id);
    if (!existing) throw new NotFoundException('Task not found');

    await this.tasksRepo.update(id, { completedAt: new Date() });
    return this.findOne(id);
  }

  async create(taskData: Partial<Task>) {
    const task = this.tasksRepo.create(taskData);
    return this.tasksRepo.save(task);
  }

  remove(id: number) {
    return this.tasksRepo.delete(id);
  }
}
