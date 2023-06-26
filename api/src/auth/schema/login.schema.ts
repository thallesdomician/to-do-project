import { User } from '@app/user/schema';
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';

export type UserDocument = HydratedDocument<Login>;

@ObjectType()
export class UserCopy implements User {
  @Field({ nullable: true })
  @Prop()
  name: string;

  @Field({ nullable: true })
  @Prop({ index: true })
  username: string;

  @Prop()
  password: string;
}

@Schema()
@ObjectType()
export class Login {
  @Field({ nullable: false })
  @Prop({ index: false, type: UserCopy, ref: UserCopy.name })
  user: User;

  @Field({ nullable: false })
  access_token: string;

  @Prop({ unique: true })
  @Field({ nullable: false })
  refresh_token: string;

  @Prop({ type: Date })
  expiration: Date;
}

export const LoginSchema = SchemaFactory.createForClass(Login);
