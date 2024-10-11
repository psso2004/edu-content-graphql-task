import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CurriculumSnapshotEntity } from 'src/curriculum/entities/curriculum-snapshot.entity';
import { CurriculumEntity } from 'src/curriculum/entities/curriculum.entity';

@ObjectType()
export class CurriculumOutput {
  constructor(
    private readonly _entity: CurriculumEntity,
    private readonly _latestSnapshotEntity: CurriculumSnapshotEntity,
  ) {}

  @Field(() => Int)
  get id(): number {
    return this._entity.id;
  }

  @Field(() => String)
  get title(): string {
    return this._latestSnapshotEntity.title;
  }

  @Field(() => String)
  get description(): string {
    return this._latestSnapshotEntity.description;
  }

  @Field(() => String)
  get content(): string {
    return this._latestSnapshotEntity.content;
  }

  @Field(() => Date)
  get createdAt(): Date {
    return this._entity.createdAt;
  }
}
