import { ObjectType } from '@nestjs/graphql';
import { PaginationOutput } from 'src/common/dtos/outputs/pagination.output';
import { CurriculumEntity } from 'src/curriculum/entities/curriculum.entity';
import { CurriculumOutput } from './curriculum.output';

@ObjectType()
export class CurriculumPaginationOutput extends PaginationOutput(
  CurriculumOutput,
) {
  constructor(
    private readonly entities: CurriculumEntity[],
    private readonly total: number,
    private readonly currentPage: number,
    private readonly perPage: number,
  ) {
    super(entities, total, currentPage, perPage);
  }

  createOutput(entity: CurriculumEntity): CurriculumOutput {
    return new CurriculumOutput(entity);
  }
}
