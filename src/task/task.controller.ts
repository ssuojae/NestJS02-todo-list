import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  createTask(
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('dueDate') dueDate: Date
  ) {
    return this.taskService.createTask(title, description, dueDate);
  }

  @Get()
  getTasks() {
    return this.taskService.getTasks();
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
