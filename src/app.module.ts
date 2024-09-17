import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',  // docker-compose의 POSTGRES_USER와 일치해야함!!
      password: 'password',  // docker-compose의 POSTGRES_PASSWORD와 일치해야함!!
      database: 'postgres',  // docker-compose의 POSTGRES_DB와 일치해야함!!
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TaskModule,
  ],
})
export class AppModule {}