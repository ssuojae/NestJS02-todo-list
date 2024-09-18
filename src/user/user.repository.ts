import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.create(createUserDto);
    return await this.save(user);
  }

  async findById(id: string): Promise<User> {
    return await this.findOne({ where: { id } });
  }

  async findAllUsers(): Promise<User[]> {
    return await this.find();
  }
}