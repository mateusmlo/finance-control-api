import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schema/user.schema';
import * as bcrypt from 'bcrypt';
import { Expense } from 'src/expenses/schema/expense.schema';

@Injectable()
export class UserService {
  private logger = new Logger('Users Service');
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { username, password } = createUserDto;

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      username,
      password: hashPassword,
    });

    return user;
  }

  async findOne(username: string): Promise<User> {
    return await this.userModel.findOne({ username });
  }
}