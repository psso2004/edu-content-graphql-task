import { Field, InputType, Int } from '@nestjs/graphql';
import { CreateEducationalContentInput } from './create-educational-content.input';

@InputType()
export class UpdateEducationalContentInput extends CreateEducationalContentInput {
  @Field(() => Int)
  id: number;
}
