import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateEducationalContentInput {
  @Field(() => Int)
  id: number;

  @Field(() => String, { nullable: true })
  title: string | null;

  @Field(() => String, { nullable: true })
  descrtion: string | null;

  @Field(() => String, { nullable: true })
  content: string | null;
}
