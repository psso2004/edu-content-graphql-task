import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CurriculumOutput } from './dtos/outputs/curriculum.output';
import { CurriculumsArgs } from './dtos/args/curriculums.args';
import { CurriculumArgs } from './dtos/args/curriculum.args';
import {
  CreateCurriculumInput,
  CurriculumEducationalContentInput,
} from './dtos/inputs/create-curriculum.input';
import { UpdateCurriculumInput } from './dtos/inputs/update-curriculum.input';
import { DeleteCurriculumInput } from './dtos/inputs/delete-curriculum.input';
import { CurriculumSnapshotOutput } from './dtos/outputs/curriculum-snapshot.output';
import { CurriculumSnapshotsArgs } from './dtos/args/curriculum-snapshots.args';
import { CurriculumService } from './curriculum.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { EducationalContentService } from './modules/educational-content/educational-content.service';
import { EducationalContentSnapshotEntity } from './modules/educational-content/entities/educational-content-snapshot.entity';
import { LatestSnapshotLoader } from './loaders/latest-snapshot.loader';
import { SnapshotsLoader } from './loaders/snapshots.loader';

@Resolver(() => CurriculumOutput)
export class CurriculumResolver {
  constructor(
    private readonly curriculumService: CurriculumService,
    private readonly educationalContentService: EducationalContentService,
    private readonly latestSnapshotLoader: LatestSnapshotLoader,
    private readonly snapshotsLoader: SnapshotsLoader,
  ) {}

  @Query(() => [CurriculumOutput])
  async curriculums(
    @Args() args: CurriculumsArgs,
  ): Promise<CurriculumOutput[]> {
    const { page, limit } = args;

    const curriculums = await this.curriculumService.getCurriculums({
      skip: (page - 1) * limit,
      take: limit,
    });

    return curriculums.map((curriculum) => new CurriculumOutput(curriculum));
  }

  @Query(() => CurriculumOutput, { nullable: true })
  async curriculum(
    @Args() args: CurriculumArgs,
  ): Promise<CurriculumOutput | null> {
    const { id } = args;

    const curriculum = await this.curriculumService.getCurriculum({
      id,
    });
    if (curriculum === null)
      throw new NotFoundException('not found curriculum');

    return new CurriculumOutput(curriculum);
  }

  @Mutation(() => CurriculumOutput)
  async createCurriculum(
    @Args('input') input: CreateCurriculumInput,
  ): Promise<CurriculumOutput> {
    const { educationalContents, ...filteredInput } = input;

    const educationalContentSnapshots =
      await this.getEducationalContentSnapshots(educationalContents);

    const curriculum = await this.curriculumService.createCurriculum({
      curriculumSnapshots: [
        Object.assign(filteredInput, {
          curriculumSnapshotEducationalContentSnapshots:
            educationalContentSnapshots.map((educationalContentSnapshot) => ({
              educationalContentSnapshot: {
                id: educationalContentSnapshot.id,
              },
            })),
        }),
      ],
    });

    return new CurriculumOutput(curriculum);
  }

  @Mutation(() => CurriculumOutput)
  async updateCurriculum(
    @Args('input') input: UpdateCurriculumInput,
  ): Promise<CurriculumOutput> {
    const { id, educationalContents, ...filteredInput } = input;

    const educationalContentSnapshots =
      await this.getEducationalContentSnapshots(educationalContents);

    const curriculum = await this.curriculumService.updateCurriculum({
      id,
      curriculumSnapshots: [
        Object.assign(filteredInput, {
          curriculumSnapshotEducationalContentSnapshots:
            educationalContentSnapshots.map((educationalContentSnapshot) => ({
              educationalContentSnapshot: {
                id: educationalContentSnapshot.id,
              },
            })),
        }),
      ],
    });

    return new CurriculumOutput(curriculum);
  }

  @Mutation(() => Boolean)
  async deleteCurriculum(
    @Args('input') input: DeleteCurriculumInput,
  ): Promise<boolean> {
    const { id } = input;
    await this.curriculumService.deleteCurriculum(id);
    return true;
  }

  @ResolveField(() => CurriculumSnapshotOutput, { nullable: true })
  async latestSnapshot(
    @Parent() parent: CurriculumOutput,
  ): Promise<CurriculumSnapshotOutput | null> {
    const latestSnapshot = await this.latestSnapshotLoader.load(parent.id);
    if (latestSnapshot === null) return null;
    return new CurriculumSnapshotOutput(latestSnapshot);
  }

  @ResolveField(() => [CurriculumSnapshotOutput])
  async snapshots(
    @Args() args: CurriculumSnapshotsArgs,
    @Parent() parent: CurriculumOutput,
  ): Promise<CurriculumSnapshotOutput[]> {
    const { id } = args;

    const snapshots = await this.snapshotsLoader.load(parent.id);
    const convertedSnapshots = snapshots.map(
      (snapshot) => new CurriculumSnapshotOutput(snapshot),
    );
    if (id && id !== null) {
      return convertedSnapshots.filter((snapshot) => snapshot.id === id);
    }

    return convertedSnapshots;
  }

  private async getEducationalContentSnapshots(
    educationalContents: CurriculumEducationalContentInput[],
  ): Promise<EducationalContentSnapshotEntity[]> {
    const educationalContentSnapshots =
      await this.educationalContentService.getUniqueEducationalContentSnapshots(
        educationalContents.map((educationalContent) => educationalContent.id),
      );

    if (educationalContentSnapshots.length <= 0) {
      throw new BadRequestException(
        'invalid educational content ids provided.',
      );
    }

    return educationalContentSnapshots;
  }
}
