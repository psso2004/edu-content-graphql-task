import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { CurriculumSnapshotEntity } from '../entities/curriculum-snapshot.entity';
import { CurriculumService } from '../curriculum.service';

@Injectable()
export class LatestSnapshotLoader extends DataLoader<
  number,
  CurriculumSnapshotEntity | null
> {
  constructor(private readonly curriculumService: CurriculumService) {
    super(
      async (
        curriculumIds: number[],
      ): Promise<(CurriculumSnapshotEntity | null)[]> => {
        const snapshots =
          await this.curriculumService.getUniqueCurriculumSnapshots(
            curriculumIds,
          );

        const snapshotMap = new Map<number, CurriculumSnapshotEntity>();
        snapshots.forEach((snapshot) =>
          snapshotMap.set(snapshot.curriculumId, snapshot),
        );

        return curriculumIds.map(
          (curriculumId) => snapshotMap.get(curriculumId) || null,
        );
      },
      { cache: false },
    );
  }
}
