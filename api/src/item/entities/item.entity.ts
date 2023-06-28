import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { add } from 'date-fns';
import { boolean } from 'joi';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<Item>;

@Schema({
  timestamps: {
    createdAt: true,
    updatedAt: true,
  },
})
@ObjectType()
export class Item {
  @Field(() => String, { description: 'ID' })
  id: string;

  @Prop({ type: String })
  @Field(() => String, { description: 'Title' })
  title: string;

  @Prop({ type: String })
  @Field(() => String, { description: 'Description', nullable: true })
  description?: string;

  @Prop({ type: Date, index: true, default: new Date() })
  @Field(() => Date, { description: 'startAt', nullable: true })
  startAt: Date;

  @Prop({ type: Date, index: true, default: add(new Date(), { hours: 1 }) })
  @Field(() => Date, { description: 'finishAt', nullable: true })
  finishAt: Date;

  @Prop({ type: Boolean, index: true, default: false })
  @Field(() => Boolean, { description: 'finished', nullable: true })
  finished: boolean;

  @Prop({ index: false })
  user: string;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
