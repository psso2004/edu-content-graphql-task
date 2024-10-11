import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class CurriculumSnapshotsArgs {
  @Field(() => Int, { nullable: true })
  id: number | null;
}
