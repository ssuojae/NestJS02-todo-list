import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { CreateTaskDTO } from './dto/create-task.dto';
import { Task } from './task.entity';
import { ITaskService } from './interfaces/task-service.interface';
import { IUserService } from '../user/interfaces/user-service.interface';

@Injectable()
export class TaskService implements ITaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    @Inject(IUserService) private readonly userService: IUserService,
  ) {}

  async createTask(createTaskDto: CreateTaskDTO): Promise<Task> {
    const { title, description, dueDate, userId } = createTaskDto;

    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const task = new Task();
    task.title = title;
    task.description = description;
    task.dueDate = dueDate;
    task.user = user;

    return await this.taskRepository.saveTask(task);
  }

  async getTasks(): Promise<Task[]> {
    return await this.taskRepository.findAllTasks();
  }

  async updateTask(id: string, status: string): Promise<Task> {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    task.status = status;
    return await this.taskRepository.saveTask(task);
  }

  async deleteTask(id: string): Promise<void> {
    await this.taskRepository.deleteTask(id);
  }
}
