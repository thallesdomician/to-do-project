import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateItemInput {
  @Field(() => String, { description: 'Key' })
  key: string;

  @Field(() => String, { description: 'Value' })
  value: string;

  user: string;
}
