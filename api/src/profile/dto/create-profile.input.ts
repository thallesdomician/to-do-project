import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateProfileInput {
  @Field(() => String, { description: 'Color' })
  cor: string;

  @Field(() => String, { description: 'Slug' })
  slug: string;

  @Field(() => String, { description: 'Name' })
  name: string;

  @Field(() => String, { description: 'Description' })
  description: string;

  user: string;
}
