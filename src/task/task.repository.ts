import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TaskRepository {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async findById(id: string): Promise<Task> {
    return await this.taskRepository.findOne({ where: { id }, relations: ['user'] });
  }

  async saveTask(task: Task): Promise<Task> {
    return await this.taskRepository.save(task);
  }

  async findAllTasks(): Promise<Task[]> {
    return await this.taskRepository.find({ relations: ['user'] });
  }

  async deleteTask(id: string): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
