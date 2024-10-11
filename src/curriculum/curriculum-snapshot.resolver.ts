import { ResolveField, Resolver } from '@nestjs/graphql';
import { CurriculumSnapshotOutput } from './dtos/outputs/curriculum-snapshot.output';
import { EducationalContentSnapshotOutput } from 'src/content/modules/educational-content/dtos/outputs/educational-content-snapshot.output';

@Resolver(() => CurriculumSnapshotOutput)
export class CurriculumSnapshotResolver {
  @ResolveField(() => [EducationalContentSnapshotOutput])
  async educationalContentSnapshots(): Promise<
    EducationalContentSnapshotOutput[]
  > {
    return [];
  }
}
