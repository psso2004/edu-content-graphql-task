import { ObjectType } from '@nestjs/graphql';
import { PaginationOutput } from 'src/common/dtos/outputs/pagination.output';
import { EducationalContentOutput } from './educational-content.output';
import { EducationalContentEntity } from '../../entities/educational-content.entity';

@ObjectType()
export class EducationalContentPaginationOutput extends PaginationOutput(
  EducationalContentOutput,
) {
  constructor(
    private readonly entities: EducationalContentEntity[],
    private readonly total: number,
    private readonly currentPage: number,
    private readonly perPage: number,
  ) {
    super(entities, total, currentPage, perPage);
  }

  createOutput(entity: EducationalContentEntity): EducationalContentOutput {
    return new EducationalContentOutput(entity);
  }
}
