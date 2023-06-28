import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class FindByDateInput {
  @Field(() => Date, { description: 'StartDate', nullable: false })
  startAt: Date;

  @Field(() => Date, { description: 'StartDate', nullable: true })
  finishAt: Date;
}
