import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class DeleteCurriculumInput {
  @Field(() => Int)
  id: number;
}
