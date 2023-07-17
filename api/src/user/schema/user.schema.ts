import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
@ObjectType()
export class User {
  @Field({ nullable: false })
  id?: string;

  @Prop({ unique: true })
  @Field({ nullable: false })
  username: string;

  @Prop()
  @Field({ nullable: false })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
