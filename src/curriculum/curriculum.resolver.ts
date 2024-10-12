import { Args, Mutation, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CurriculumOutput } from './dtos/outputs/curriculum.output';
import { CurriculumsArgs } from './dtos/args/curriculums.args';
import { CurriculumArgs } from './dtos/args/curriculum.args';
import { CreateCurriculumInput } from './dtos/inputs/create-curriculum.input';
import { UpdateCurriculumInput } from './dtos/inputs/update-curriculum.input';
import { DeleteCurriculumInput } from './dtos/inputs/delete-curriculum.input';
import { CurriculumSnapshotOutput } from './dtos/outputs/curriculum-snapshot.output';
import { CurriculumSnapshotsArgs } from './dtos/args/curriculum-snapshots.args';

@Resolver(() => CurriculumOutput)
export class CurriculumResolver {
  @Query(() => [CurriculumOutput])
  async curriculums(
    @Args() args: CurriculumsArgs,
  ): Promise<CurriculumOutput[]> {
    args;
    return [];
  }

  @Query(() => CurriculumOutput, { nullable: true })
  async curriculum(
    @Args() args: CurriculumArgs,
  ): Promise<CurriculumOutput | null> {
    args;
    return null;
  }

  @Mutation(() => CurriculumOutput)
  async createCurriculum(
    @Args('input') input: CreateCurriculumInput,
  ): Promise<CurriculumOutput> {
    input;
    return {} as CurriculumOutput;
  }

  @Mutation(() => CurriculumOutput)
  async updateCurriculum(
    @Args('input') input: UpdateCurriculumInput,
  ): Promise<CurriculumOutput> {
    input;
    return {} as CurriculumOutput;
  }

  @Mutation(() => Boolean)
  async deleteCurriculum(
    @Args('input') input: DeleteCurriculumInput,
  ): Promise<boolean> {
    input;
    return true;
  }

  @ResolveField(() => CurriculumSnapshotOutput)
  async latestSnapshot(): Promise<CurriculumSnapshotOutput> {
    return {} as CurriculumSnapshotOutput;
  }

  @ResolveField(() => [CurriculumSnapshotOutput])
  async snapshots(
    @Args() args: CurriculumSnapshotsArgs,
  ): Promise<CurriculumSnapshotOutput[]> {
    args;
    return [];
  }
}
