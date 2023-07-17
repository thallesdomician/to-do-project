import { AuthResolver } from '@app/auth/resolver';
import { Login, LoginSchema } from '@app/auth/schema/login.schema';
import { AuthService } from '@app/auth/service';
import { User, UserSchema } from '@app/user/schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Login.name, schema: LoginSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [AuthResolver, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
