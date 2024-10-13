import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { EducationalContentService } from '../educational-content.service';
import { EducationalContentSnapshotEntity } from '../entities/educational-content-snapshot.entity';
import { In } from 'typeorm';

@Injectable()
export class EducationalContentSnapshotsLoader extends DataLoader<
  number,
  EducationalContentSnapshotEntity[]
> {
  constructor(
    private readonly educationalContentService: EducationalContentService,
  ) {
    super(
      async (
        educationalContentIds: number[],
      ): Promise<EducationalContentSnapshotEntity[][]> => {
        const snapshots =
          await this.educationalContentService.getEducationalContentSnapshots({
            where: {
              educationalContentId: In(educationalContentIds),
            },
          });

        const snapshotMap = new Map<
          number,
          EducationalContentSnapshotEntity[]
        >();
        snapshots.forEach((snapshot) => {
          if (!snapshotMap.has(snapshot.educationalContentId)) {
            snapshotMap.set(snapshot.educationalContentId, []);
          }
          snapshotMap.get(snapshot.educationalContentId)?.push(snapshot);
        });

        return educationalContentIds.map(
          (educationalContentId) => snapshotMap.get(educationalContentId) || [],
        );
      },
      { cache: false },
    );
  }
}
