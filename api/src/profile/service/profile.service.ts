import { CreateProfileInput } from '@app/profile/dto/create-profile.input';
import { UpdateProfileInput } from '@app/profile/dto/update-profile.input';
import { Profile } from '@app/profile/entities';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name) private readonly profileModel: Model<Profile>,
  ) {}

  async create(data: CreateProfileInput) {
    const profile = await this.profileModel.findOne({ user: data.user }).exec();
    if (profile) throw new UnauthorizedException('Perfil já existe');
    return await this.profileModel.create(data);
  }

  async findOne(user: string) {
    return await this.profileModel.findOne({ user }).exec();
  }

  update(id: number, updateProfileInput: UpdateProfileInput) {
    return `This action updates a #${id} profile`;
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
