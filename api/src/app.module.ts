import { Module } from '@nestjs/common';
import { CommonModule } from '@app/common/common.module';
import { UserModule } from '@app/user/user.module';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { AuthModule } from './auth/auth.module';
import { ItemModule } from './item/item.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    CommonModule.register({
      configModule: {
        ignoreEnvFile: ['production'].includes(process.env.NODE_ENV),
        envFilePath: '.env',
        isGlobal: true,
      },
    }),
    UserModule,
    AuthModule,
    ItemModule,
    ProfileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
