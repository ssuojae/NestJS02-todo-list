import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDTO } from './dto/create-task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDTO) {
    return this.taskService.createTask(createTaskDto);
  }

  @Get()
  async getTasks() {
    const tasks = await this.taskService.getTasks();
    return tasks;
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
