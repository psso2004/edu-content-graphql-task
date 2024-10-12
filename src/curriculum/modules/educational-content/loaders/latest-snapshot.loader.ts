import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { EducationalContentService } from '../educational-content.service';
import { EducationalContentSnapshotEntity } from '../entities/educational-content-snapshot.entity';
import { In } from 'typeorm';

@Injectable()
export class LatestSnapshotLoader extends DataLoader<
  number,
  EducationalContentSnapshotEntity | null
> {
  constructor(
    private readonly educationalContentService: EducationalContentService,
  ) {
    super(
      async (
        educationalContentIds: number[],
      ): Promise<(EducationalContentSnapshotEntity | null)[]> => {
        const snapshots =
          await this.educationalContentService.getEducationalContentSnapshots({
            where: {
              educationalContentId: In(educationalContentIds),
            },
            order: {
              createdAt: 'DESC',
            },
          });

        const snapshotMap = new Map<number, EducationalContentSnapshotEntity>();
        snapshotMap.set(snapshots[0].educationalContentId, snapshots[0]);

        return educationalContentIds.map((key) => snapshotMap.get(key) || null);
      },
      { cache: false },
    );
  }
}
