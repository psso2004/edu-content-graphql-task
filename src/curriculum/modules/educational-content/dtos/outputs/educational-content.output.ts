import { Field, Int, ObjectType } from '@nestjs/graphql';
import { EducationalContentEntity } from '../../entities/educational-content.entity';
import { EducationalContentSnapshotEntity } from '../../entities/educational-content-snapshot.entity';

@ObjectType()
export class EducationalContentOutput {
  constructor(
    private readonly _entity: EducationalContentEntity,
    private readonly _latestSnapshotEntity: EducationalContentSnapshotEntity,
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
