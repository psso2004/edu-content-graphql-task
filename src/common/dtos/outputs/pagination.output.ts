import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IClassType } from '../interfaces/class-type.interface';

@ObjectType()
export class PaginationInfoOutput {
  @Field(() => Int)
  totalCount: number;

  @Field(() => Int)
  currentPage: number;

  @Field(() => Int)
  perPage: number;

  @Field(() => Int)
  lastPage: number;

  constructor(totalCount: number, currentPage: number, perPage: number) {
    this.totalCount = totalCount;
    this.currentPage = currentPage;
    this.perPage = perPage;
    this.lastPage = Math.max(Math.ceil(totalCount / perPage), 1);
  }
}

export function PaginationOutput<T, TOutput>(
  OutputClass: IClassType<TOutput>,
): any {
  @ObjectType({ isAbstract: true })
  abstract class PaginationOutputClass {
    protected constructor(
      private readonly entities: T[],
      private readonly total: number,
      private readonly currentPage: number,
      private readonly perPage: number,
    ) {}

    abstract createOutput(entity: T): TOutput;

    @Field(() => [OutputClass])
    get data() {
      return this.entities.map((entity) => this.createOutput(entity));
    }

    @Field(() => PaginationInfoOutput)
    get paginationInfo() {
      return new PaginationInfoOutput(
        this.total,
        this.currentPage,
        this.perPage,
      );
    }
  }

  return PaginationOutputClass;
}
