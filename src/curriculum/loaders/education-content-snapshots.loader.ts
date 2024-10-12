import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { DataSource, In } from 'typeorm';
import { EducationalContentSnapshotEntity } from '../modules/educational-content/entities/educational-content-snapshot.entity';
import { CurriculumSnapshotEducationalContentSnapshotEntity } from '../entities/curriculum-snapshot-educational-content-snapshot.entity';

@Injectable()
export class EducationalContentSnapshotsLoader extends DataLoader<
  number,
  EducationalContentSnapshotEntity[]
> {
  constructor(private readonly dataSource: DataSource) {
    super(
      async (
        curriculumSnapshotIds: number[],
      ): Promise<EducationalContentSnapshotEntity[][]> => {
        const repo = this.dataSource.getRepository(
          CurriculumSnapshotEducationalContentSnapshotEntity,
        );
        const curriculumSnapshotEducationalContentSnapshots = await repo.find({
          where: {
            curriculumSnapshotId: In(curriculumSnapshotIds),
          },
          relations: ['educationalContentSnapshot'],
        });

        return curriculumSnapshotIds.map((curriculumSnapshotId) =>
          curriculumSnapshotEducationalContentSnapshots
            .filter(
              (entity) => entity.curriculumSnapshotId === curriculumSnapshotId,
            )
            .map((entity) => entity.educationalContentSnapshot),
        );
      },
      { cache: false },
    );
  }
}
