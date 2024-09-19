import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { IUserService } from './interfaces/user-service.interface';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UserRepository,
    {
      provide: IUserService,
      useClass: UserService,
    },
  ],
  controllers: [UserController],
  exports: [
    {
      provide: IUserService,
      useClass: UserService,
    },
  ],
})
export class UserModule {}
