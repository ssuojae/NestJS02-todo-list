import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TaskRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async findById(id: string): Promise<Task> {
    return await this.findOne({ where: { id }, relations: ['user'] });
  }

  async saveTask(task: Task): Promise<Task> {
    return await this.save(task);
  }

  async findAllTasks(): Promise<Task[]> {
    return await this.find();
  }

  async deleteTask(id: string): Promise<void> {
    await this.delete(id);
  }
}
