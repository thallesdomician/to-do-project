import { CreateItemInput } from '@app/item/dto/create-item.input.model';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateItemInput extends PartialType(CreateItemInput) {
  @Field(() => String)
  id: string;

  @Field(() => Boolean, { description: 'Finished', nullable: true })
  finished?: boolean;
}
