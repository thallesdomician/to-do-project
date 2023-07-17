import { AuthModule } from '@app/auth/auth.module';
import { UserResolver } from '@app/user/resolver';
import { User, UserSchema } from '@app/user/schema';
import { UserService } from '@app/user/service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    AuthModule,
  ],
  providers: [UserResolver, UserService],
})
export class UserModule {}
