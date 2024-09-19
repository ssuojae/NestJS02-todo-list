import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../user.entity';

export abstract class IUserService {
  abstract createUser(createUserDto: CreateUserDto): Promise<User>;
  abstract getUserById(id: string): Promise<User>;
  abstract getAllUsers(): Promise<User[]>;
}
