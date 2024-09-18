import { Injectable } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { CreateTaskDTO } from './dto/create-task.dto';
import { Task } from './task.entity';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async createTask(createTaskDto: CreateTaskDTO): Promise<Task> {
    const { title, description, dueDate, userId } = createTaskDto;

    const task = new Task();
    task.title = title;
    task.description = description;
    task.dueDate = dueDate;
    task.user = { id: userId } as any;

    return await this.taskRepository.saveTask(task);
  }

  async getTasks(): Promise<Task[]> {
    return await this.taskRepository.findAllTasks();
  }

  async updateTask(id: string, status: string): Promise<Task> {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      throw new Error('Task not found');
    }
    task.status = status;
    return await this.taskRepository.saveTask(task);
  }

  async deleteTask(id: string): Promise<void> {
    await this.taskRepository.deleteTask(id);
  }
}
