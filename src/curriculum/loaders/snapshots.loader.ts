import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { In } from 'typeorm';
import { CurriculumSnapshotEntity } from '../entities/curriculum-snapshot.entity';
import { CurriculumService } from '../curriculum.service';

@Injectable()
export class SnapshotsLoader extends DataLoader<
  number,
  CurriculumSnapshotEntity[]
> {
  constructor(private readonly curriculumService: CurriculumService) {
    super(
      async (
        curriculumIds: number[],
      ): Promise<CurriculumSnapshotEntity[][]> => {
        const snapshots = await this.curriculumService.getCurriculumSnapshots({
          where: {
            curriculumId: In(curriculumIds),
          },
        });

        const snapshotMap = new Map<number, CurriculumSnapshotEntity[]>();
        snapshots.forEach((snapshot) => {
          if (!snapshotMap.has(snapshot.curriculumId)) {
            snapshotMap.set(snapshot.curriculumId, []);
          }
          snapshotMap.get(snapshot.curriculumId)?.push(snapshot);
        });

        return curriculumIds.map(
          (curriculumId) => snapshotMap.get(curriculumId) || [],
        );
      },
      { cache: false },
    );
  }
}
