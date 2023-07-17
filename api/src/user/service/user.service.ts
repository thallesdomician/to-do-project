import { CreateUserInput, UpdateUserInput } from '@app/user/dto';
import { User } from '@app/user/schema';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { AuthService } from '@app/auth/service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly authService: AuthService,
  ) {}

  async create(input: CreateUserInput) {
    const oldUser = await this.userModel
      .findOne({ username: input.username })
      .exec();

    if (oldUser)
      throw new BadRequestException(`User exists: '${input.username}'`);

    const password = await bcrypt
      .hash(input.password, 10)
      .then((hash) => {
        return hash;
      })
      .catch((err) => {
        throw new Error(err);
      });
    const data: User = {
      password,
      username: input.username,
    };

    const user = await this.userModel.create(data);
    user.password = '';
    const auth = await this.authService.generatePayload(user);
    return { ...auth };
  }

  async findOne(username: string) {
    return await this.userModel.findOne({ username }).exec();
  }
}
