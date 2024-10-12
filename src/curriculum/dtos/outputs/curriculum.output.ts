import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CurriculumEntity } from 'src/curriculum/entities/curriculum.entity';
import { CurriculumSnapshotOutput } from './curriculum-snapshot.output';

@ObjectType()
export class CurriculumOutput {
  constructor(private readonly _entity: CurriculumEntity) {}

  @Field(() => Int)
  get id(): number {
    return this._entity.id;
  }

  @Field(() => Date)
  get createdAt(): Date {
    return this._entity.createdAt;
  }

  @Field(() => CurriculumSnapshotOutput)
  latestSnapshot: CurriculumSnapshotOutput;

  @Field(() => [CurriculumSnapshotOutput])
  snapshots: CurriculumSnapshotOutput[];
}
