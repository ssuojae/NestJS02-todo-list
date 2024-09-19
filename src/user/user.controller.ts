import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { IUserService } from './interfaces/user-service.interface';

@Controller('users')
export class UserController {
  constructor(private readonly userService: IUserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return await this.userService.getUserById(id);
  }

  @Get()
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }
}