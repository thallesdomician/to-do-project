import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'Username' })
  username: string;

  @Field(() => String, { description: 'Name' })
  name: string;

  @Field(() => String, { description: 'Password' })
  password: string;
}
