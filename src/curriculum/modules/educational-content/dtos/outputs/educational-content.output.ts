import { Field, Int, ObjectType } from '@nestjs/graphql';
import { EducationalContentEntity } from '../../entities/educational-content.entity';
import { EducationalContentSnapshotOutput } from './educational-content-snapshot.output';

@ObjectType()
export class EducationalContentOutput {
  constructor(private readonly _entity: EducationalContentEntity) {}

  @Field(() => Int)
  get id(): number {
    return this._entity.id;
  }

  @Field(() => Date)
  get createdAt(): Date {
    return this._entity.createdAt;
  }

  @Field(() => EducationalContentSnapshotOutput)
  latestSnapshot: EducationalContentSnapshotOutput;

  @Field(() => [EducationalContentSnapshotOutput])
  snapshots: EducationalContentSnapshotOutput[];
}
