import { CreateItemInput, UpdateItemInput } from '@app/item/dto';
import { Item } from '@app/item/entities';
import { User } from '@app/user/schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ItemService {
  constructor(
    @InjectModel(Item.name) private readonly itemModel: Model<Item>,
  ) {}

  async create(dataInput: CreateItemInput) {
    dataInput.datetime;
    const createdItem = await this.itemModel.create(dataInput);
    return createdItem;
  }

  findAll(user: User) {
    return `This action returns all item from: ${user.username}`;
  }

  findOne(id: number) {
    return `This action returns a #${id} item`;
  }

  update(id: number, updateItemInput: UpdateItemInput) {
    return `This action updates a #${id} item`;
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }
}
