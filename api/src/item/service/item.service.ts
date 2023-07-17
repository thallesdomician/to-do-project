import { IUserPayload } from '@app/auth/interface';
import { CreateItemInput, UpdateItemInput } from '@app/item/dto';
import { Item } from '@app/item/entities';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ItemService {
  constructor(
    @InjectModel(Item.name) private readonly itemModel: Model<Item>,
  ) {}

  async create(dataInput: CreateItemInput, user: IUserPayload) {
    dataInput.user = user.sub;
    return await this.itemModel.create(dataInput);
  }

  async findOne(id: number, user: IUserPayload) {
    const res = await this.itemModel.findOne({ id, user: user.sub }).exec();
    return res;
  }

  async update(
    id: string,
    updateItemInput: UpdateItemInput,
    user: IUserPayload,
  ) {
    const updated = await this.itemModel.updateOne(
      { _id: id, user: user.sub },
      { ...updateItemInput },
    );
    if (updated.modifiedCount == 0) throw new NotFoundException();

    const newItem = await this.itemModel
      .findOne({ _id: id, user: updateItemInput.user })
      .exec();
    return newItem;
  }

  remove(id: number, user: IUserPayload) {
    return `This action removes a #${id}  ${user.username}item`;
  }
}
