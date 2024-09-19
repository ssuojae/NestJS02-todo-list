import { CreateTaskDTO } from '../dto/create-task.dto';
import { Task } from '../task.entity';

export abstract class ITaskService {
  abstract createTask(createTaskDto: CreateTaskDTO): Promise<Task>;
  abstract getTasks(): Promise<Task[]>;
  abstract updateTask(id: string, status: string): Promise<Task>;
  abstract deleteTask(id: string): Promise<void>;
}
