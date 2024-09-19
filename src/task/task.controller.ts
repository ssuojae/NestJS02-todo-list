import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { ITaskService } from './interfaces/task-service.interface';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: ITaskService) {}

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDTO) {
    return this.taskService.createTask(createTaskDto);
  }

  @Get()
  async getTasks() {
    return await this.taskService.getTasks();
  }

  @Patch(':id')
  updateTask(@Param('id') id: string, @Body('status') status: string) {
    return this.taskService.updateTask(id, status);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    return this.taskService.deleteTask(id);
  }
}
