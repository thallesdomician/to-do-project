import { Profile, ProfileSchema } from '@app/profile/entities';
import { ProfileResolver } from '@app/profile/resolver';
import { ProfileService } from '@app/profile/service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Profile.name, schema: ProfileSchema }]),
  ],
  providers: [ProfileResolver, ProfileService],
})
export class ProfileModule {}
