import { Args, Mutation, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { EducationalContentOutput } from './dtos/outputs/educational-content.output';
import { EducationalContentSnapshotOutput } from './dtos/outputs/educational-content-snapshot.output';
import { EducationalContentSnapshotsArgs } from './dtos/args/educational-content-snapshots.args';
import { CreateEducationalContentInput } from './dtos/inputs/create-educational-content.input';
import { EducationalContentsArgs } from './dtos/args/educational-contents.args';
import { EducationalContentArgs } from './dtos/args/educational-content.args';
import { UpdateEducationalContentInput } from './dtos/inputs/update-educational-content.input';
import { DeleteEducationalContentInput } from './dtos/inputs/delete-educational-content.input';
import { EducationalContentService } from './educational-content.service';
import { NotFoundException } from '@nestjs/common';

@Resolver(() => EducationalContentOutput)
export class EducationalContentResolver {
  constructor(
    private readonly educationalContentService: EducationalContentService,
  ) {}

  @Query(() => [EducationalContentOutput])
  async educationalContents(
    @Args() args: EducationalContentsArgs,
  ): Promise<EducationalContentOutput[]> {
    const { page, limit } = args;

    // todo: count 기능 추가해야됨.
    const [educationalContents] = await Promise.all([
      this.educationalContentService.getEducationalContents({
        relations: ['educationalContentSnapshots'],
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    // todo: paginated 객체로 반환하도록 수정해야됨.
    return educationalContents.map((educationalContent) => {
      const latestSnapshot =
        educationalContent.educationalContentSnapshots.at(-1);
      if (!latestSnapshot)
        throw new NotFoundException('not found latest snapshot');
      return new EducationalContentOutput(educationalContent, latestSnapshot);
    });
  }

  @Query(() => EducationalContentOutput, { nullable: true })
  async educationalContent(
    @Args() args: EducationalContentArgs,
  ): Promise<EducationalContentOutput | null> {
    const { id } = args;

    const educationalContent =
      await this.educationalContentService.getEducationalContent({
        where: {
          id,
        },
        relations: ['educationalContentSnapshots'],
        order: {
          educationalContentSnapshots: {
            createdAt: 'DESC',
          },
        },
      });
    if (educationalContent === null) {
      throw new NotFoundException('not found educationalContent');
    }

    const latestSnapshot = educationalContent?.educationalContentSnapshots[0];

    return new EducationalContentOutput(educationalContent, latestSnapshot);
  }

  @Mutation(() => EducationalContentOutput)
  async createEducationalContent(
    @Args('input') input: CreateEducationalContentInput,
  ): Promise<EducationalContentOutput> {
    const educationalContent =
      await this.educationalContentService.createEducationalContent({
        educationalContentSnapshots: [input],
      });
    const latestSnapshot = educationalContent.educationalContentSnapshots[0];
    return new EducationalContentOutput(educationalContent, latestSnapshot);
  }

  @Mutation(() => EducationalContentOutput)
  async updateEducationalContent(
    @Args('input') input: UpdateEducationalContentInput,
  ): Promise<EducationalContentOutput> {
    const { id, ...updateInput } = input;

    const educationalContent =
      await this.educationalContentService.updateEducationalContent({
        id,
        educationalContentSnapshots: [updateInput],
      });
    const latestSnapshot = educationalContent.educationalContentSnapshots[0];

    return new EducationalContentOutput(educationalContent, latestSnapshot);
  }

  @Mutation(() => Boolean)
  async deleteEducationalContent(
    @Args('input') input: DeleteEducationalContentInput,
  ): Promise<boolean> {
    const { id } = input;
    await this.educationalContentService.deleteEducationalContent(id);
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