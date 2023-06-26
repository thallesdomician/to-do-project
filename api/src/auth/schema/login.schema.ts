import { User } from '@app/user/schema';
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<Login>;

@ObjectType()
export class Login {
  @Field({ nullable: false })
  @Prop({ type: User })
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
