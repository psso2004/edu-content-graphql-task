import { Field, InputType, Int } from '@nestjs/graphql';
import { CreateCurriculumInput } from './create-curriculum.input';

@InputType()
export class UpdateCurriculumInput extends CreateCurriculumInput {
  @Field(() => Int)
  id: number;
}
