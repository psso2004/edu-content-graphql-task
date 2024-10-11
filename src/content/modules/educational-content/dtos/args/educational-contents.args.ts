import { ArgsType, Field, Int } from '@nestjs/graphql';

/**
 * EducationalContentsArgs 클래스
 *
 * 이 클래스는 `educationalContents` 쿼리에서 사용되는 인수 객체입니다.
 *
 * `educationalContents` 쿼리는 여러 개의 교육 콘텐츠를 조회할 때 사용됩니다.
 * 이 인수 객체를 통해 클라이언트는 필요한 필터링 조건이나 페이지네이션 정보를 전달할 수 있습니다.
 */
@ArgsType()
export class EducationalContentsArgs {
  @Field(() => Int, { nullable: true, defaultValue: 1 })
  page: number;

  @Field(() => Int, { nullable: true, defaultValue: 10 })
  limit: number;
}
