import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class EducationalContentSnapshotsArgs {
  @Field(() => Int, { nullable: true })
  id: number | null;
}
