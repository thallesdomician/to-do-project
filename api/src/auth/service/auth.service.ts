import { LoginAuthInput, RefreshTokenAuthInput } from '@app/auth/dto';
import { Login } from '@app/auth/schema';
import { User } from '@app/user/schema';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import { add } from 'date-fns';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Login.name) private readonly loginModel: Model<Login>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async generatePayload(user: User) {
    const payload = { sub: user.id, username: user.username };
    const access_token = await this.jwtService.signAsync(payload);
    const refresh_token = uuidv4();

    const data: Login = {
      user,
      expiration: add(new Date(), {
        days: 1,
      }),
      access_token,
      refresh_token,
    };

    return data;
  }
  async login(loginInput: LoginAuthInput): Promise<Login> {
    const { username, password } = loginInput;
    const user = await this.userModel.findOne({ username }).exec();
    const isValid = await bcrypt
      .compare(password, user.password)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw new Error(err);
      });

    if (!isValid) throw new UnauthorizedException('Invalid user or password');

    const data = await this.generatePayload(user);

    await this.loginModel
      .deleteMany({
        'user.username': username,
      })
      .exec();
    await this.loginModel.create(data);

    return data;
  }

  refreshToken(refreshTokenInput: RefreshTokenAuthInput) {
    return `This action returns all auth`;
  }
}
