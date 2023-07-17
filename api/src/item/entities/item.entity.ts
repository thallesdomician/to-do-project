import { User } from '@app/user/schema';
import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

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
  @Field(() => String, { description: 'Key', nullable: false })
  key: string;

  @Prop({ type: String })
  @Field(() => String, { description: 'Value', nullable: false })
  value: string;

  @Prop({ type: Boolean, index: true })
  @Field(() => Boolean, { description: 'active', nullable: true })
  active: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
