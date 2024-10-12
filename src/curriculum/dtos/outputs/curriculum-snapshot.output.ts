import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CurriculumSnapshotEntity } from 'src/curriculum/entities/curriculum-snapshot.entity';
import { EducationalContentSnapshotOutput } from 'src/curriculum/modules/educational-content/dtos/outputs/educational-content-snapshot.output';

@ObjectType()
export class CurriculumSnapshotOutput {
  constructor(private readonly _entity: CurriculumSnapshotEntity) {}

  @Field(() => Int)
  get id(): number {
    return this._entity.id;
  }

  @Field(() => String)
  get title(): string {
    return this._entity.title;
  }

  @Field(() => String)
  get description(): string {
    return this._entity.description;
  }

  @Field(() => String)
  get content(): string {
    return this._entity.content;
  }

  @Field(() => Date)
  get createdAt(): Date {
    return this._entity.createdAt;
  }

  @Field(() => [EducationalContentSnapshotOutput])
  educationalContentSnapshots: EducationalContentSnapshotOutput[];
}
