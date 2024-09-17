import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDTO } from './create-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async createTask(createTaskDto: CreateTaskDTO): Promise<Task> {
    const { title, description, dueDate } = createTaskDto;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.dueDate = dueDate;
    return await this.taskRepository.save(task);
  }

  async getTasks(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  async updateTask(id: string, status: string): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new Error('Task not found');
    }
    task.status = status;
    return await this.taskRepository.save(task);
  }

  async deleteTask(id: string): Promise<void> {
    await this.taskRepository.delete(id);
  }
}