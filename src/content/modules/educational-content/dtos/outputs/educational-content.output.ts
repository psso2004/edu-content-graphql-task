import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class EducationalContentOutput {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  title: string;

  @Field(() => String)
  descrtion: string;

  @Field(() => String)
  content: string;

  @Field(() => Date)
  createdAt: Date;
}
