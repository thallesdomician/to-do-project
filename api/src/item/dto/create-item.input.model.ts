import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateItemInput {
  @Field(() => String, { description: 'Title' })
  title: string;

  @Field(() => String, { description: 'Description' })
  description: string;

  @Field(() => Date, { description: 'StartAt', nullable: true })
  startAt?: Date;

  user: string;
}
