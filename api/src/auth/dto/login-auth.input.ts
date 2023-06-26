import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class LoginAuthInput {
  @Field(() => String, { description: 'Username' })
  username: string;

  @Field(() => String, { description: 'Password' })
  password: string;
}
