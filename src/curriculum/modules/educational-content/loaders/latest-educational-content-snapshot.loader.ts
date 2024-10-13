import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { EducationalContentService } from '../educational-content.service';
import { EducationalContentSnapshotEntity } from '../entities/educational-content-snapshot.entity';

@Injectable()
export class LatestEducationalContentSnapshotLoader extends DataLoader<
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
          await this.educationalContentService.getUniqueEducationalContentSnapshots(
            educationalContentIds,
          );

        const snapshotMap = new Map<number, EducationalContentSnapshotEntity>();
        snapshots.forEach((snapshot) =>
          snapshotMap.set(snapshot.educationalContentId, snapshot),
        );

        return educationalContentIds.map(
          (educationalContentId) =>
            snapshotMap.get(educationalContentId) || null,
        );
      },
      { cache: false },
    );
  }
}
