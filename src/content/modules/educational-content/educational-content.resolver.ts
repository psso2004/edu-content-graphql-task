import { Args, Mutation, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { EducationalContentOutput } from './dtos/outputs/educational-content.output';
import { EducationalContentSnapshotOutput } from './dtos/outputs/educational-content-snapshot.output';
import { EducationalContentSnapshotsArgs } from './dtos/args/educational-content-snapshots.args';
import { CreateEducationalContentInput } from './dtos/inputs/create-educational-content.input';
import { EducationalContentsArgs } from './dtos/args/educational-contents.args';
import { EducationalContentArgs } from './dtos/args/educational-content.args';
import { UpdateEducationalContentInput } from './dtos/inputs/update-educational-content.input';
import { DeleteEducationalContentInput } from './dtos/inputs/delete-educational-content.input';

@Resolver(() => EducationalContentOutput)
export class EducationalContentResolver {
  @Query(() => [EducationalContentOutput])
  async educationalContents(
    @Args() args: EducationalContentsArgs,
  ): Promise<EducationalContentOutput[]> {
    args;
    return [];
  }

  @Query(() => EducationalContentOutput, { nullable: true })
  async educationalContent(
    @Args() args: EducationalContentArgs,
  ): Promise<EducationalContentOutput | null> {
    args;
    return null;
  }

  @Mutation(() => EducationalContentOutput)
  async createEducationalContent(
    @Args('input') input: CreateEducationalContentInput,
  ): Promise<EducationalContentOutput> {
    input;
    return {} as EducationalContentOutput;
  }

  @Mutation(() => EducationalContentOutput)
  async updateEducationalContent(
    @Args('input') input: UpdateEducationalContentInput,
  ): Promise<EducationalContentOutput> {
    input;
    return {} as EducationalContentOutput;
  }

  @Mutation(() => Boolean)
  async deleteEducationalContent(
    @Args('input') input: DeleteEducationalContentInput,
  ): Promise<boolean> {
    input;
    return true;
  }

  @ResolveField(() => [EducationalContentSnapshotOutput])
  async snapshots(
    @Args() args: EducationalContentSnapshotsArgs,
  ): Promise<EducationalContentSnapshotOutput[]> {
    args;
    // todo: dataloader 적용예정.
    return [];
  }
}
