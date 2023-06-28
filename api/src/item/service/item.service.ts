import { IUserPayload } from '@app/auth/interface';
import {
  CreateItemInput,
  FindByDateInput,
  UpdateItemInput,
} from '@app/item/dto';
import { Item } from '@app/item/entities';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { endOfDay, startOfDay } from 'date-fns';
import { Model } from 'mongoose';

@Injectable()
export class ItemService {
  constructor(
    @InjectModel(Item.name) private readonly itemModel: Model<Item>,
  ) {}

  async create(dataInput: CreateItemInput) {
    const createdItem = await this.itemModel.create(dataInput);
    return createdItem;
  }

  async findAll(input: FindByDateInput, userPayload: IUserPayload) {
    return await this.itemModel
      .find({
        startAt: {
          $gte: startOfDay(input.startAt),
          $lt: endOfDay(input.finishAt || input.startAt),
        },
        user: userPayload.sub,
      })
      .sort({ datetime: 1, position: 1 })
      .exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} item`;
  }

  async update(
    id: string,
    updateItemInput: UpdateItemInput,
    userPayload: IUserPayload,
  ) {
    const updated = await this.itemModel.updateOne(
      { _id: id, user: userPayload.sub },
      { finished: updateItemInput.finished },
    );
    if (updated.modifiedCount == 0) throw new NotFoundException();

    const newItem = await this.itemModel
      .findOne({ _id: id, user: userPayload.sub })
      .exec();
    return newItem;
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }
}
