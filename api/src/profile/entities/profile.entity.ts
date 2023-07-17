import { Item } from '@app/item/entities';
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
export class Profile {
  @Field(() => String, { description: 'ID' })
  id: string;

  @Prop({ type: String })
  @Field(() => String, { description: 'Image', nullable: true })
  image: string;

  @Prop({ type: String })
  @Field(() => String, { description: 'Cor', nullable: true })
  cor: string;

  @Prop({ type: String, index: true, unique: true })
  @Field(() => String, { description: 'slug', nullable: false })
  slug: string;

  @Prop({ type: String })
  @Field(() => String, { description: 'Name', nullable: false })
  name: string;

  @Prop({ type: String })
  @Field(() => String, { description: 'Description', nullable: true })
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
