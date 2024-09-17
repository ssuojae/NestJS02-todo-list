import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'user',
      password: 'password',
      database: 'mydb',
      entities: [__dirname + '/**/*.entity{.ts,.js}'], //.entity.ts 파일 자동 연동
      synchronize: true, // 프로덕션 환경에서는 false 로 해야함 - 자동연동x
    }),
  ],
})
export class AppModule {}