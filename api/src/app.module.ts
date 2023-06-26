import { Module } from '@nestjs/common';
import { CommonModule } from '@app/common/common.module';
import { UserModule } from '@app/user/user.module';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
