import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class DeleteEducationalContentInput {
  @Field(() => Int)
  id: number;
}
