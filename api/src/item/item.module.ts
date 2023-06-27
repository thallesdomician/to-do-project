import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemResolver } from '@app/item/resolver';
import { ItemService } from '@app/item/service';
import { Item, ItemSchema } from '@app/item/entities';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
  ],
  providers: [ItemResolver, ItemService],
})
export class ItemModule {}
