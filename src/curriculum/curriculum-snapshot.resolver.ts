import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { CurriculumSnapshotOutput } from './dtos/outputs/curriculum-snapshot.output';
import { EducationalContentSnapshotOutput } from 'src/curriculum/modules/educational-content/dtos/outputs/educational-content-snapshot.output';
import { EducationalContentSnapshotsLoader } from './loaders/education-content-snapshots.loader';

@Resolver(() => CurriculumSnapshotOutput)
export class CurriculumSnapshotResolver {
  constructor(
    private readonly snapshotsLoader: EducationalContentSnapshotsLoader,
  ) {}

  @ResolveField(() => [EducationalContentSnapshotOutput])
  async educationalContentSnapshots(
    @Parent() parent: CurriculumSnapshotOutput,
  ): Promise<EducationalContentSnapshotOutput[]> {
    const snapshotEntities = await this.snapshotsLoader.load(parent.id);
    return snapshotEntities.map(
      (snapshotEntity) => new EducationalContentSnapshotOutput(snapshotEntity),
    );
  }
}
