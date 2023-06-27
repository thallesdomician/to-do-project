import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<Item>;

@Schema()
@ObjectType()
export class Item {
  @Prop({ type: String })
  @Field(() => String, { description: 'Title' })
  title: string;

  @Prop({ type: String })
  @Field(() => String, { description: 'Description', nullable: true })
  description?: string;

  @Prop({ type: Date, index: true, default: new Date() })
  @Field(() => Date, { description: 'Datetime', nullable: true })
  datetime: Date;

  @Prop({ type: Number, index: true, default: -1 })
  @Field(() => Int, { description: 'Position', nullable: true })
  position: number;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
