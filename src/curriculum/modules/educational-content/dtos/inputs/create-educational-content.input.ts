import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateEducationalContentInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  content: string;
}
