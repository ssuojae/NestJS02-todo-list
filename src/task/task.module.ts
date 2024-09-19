import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskController } from './task.controller';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { TaskService } from './task.service';
import { ITaskService } from './interfaces/task-service.interface';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), UserModule],
  controllers: [TaskController],
  providers: [
    TaskRepository,
    {
      provide: ITaskService,
      useClass: TaskService,
    },
  ],
})
export class TaskModule {}
