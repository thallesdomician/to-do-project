import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class RefreshTokenAuthInput {
  @Field(() => Int, { description: 'Username' })
  username: number;

  @Field(() => Int, { description: 'Password' })
  password: number;
}
