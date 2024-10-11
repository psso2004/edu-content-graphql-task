import { ArgsType, Field, Int } from '@nestjs/graphql';

/**
 * 이 클래스는 `curriculum` 쿼리에서 사용되는 인수 객체입니다.
 *
 * `curriculum` 쿼리는 특정 커리큘럼을 조회할 때 사용되며,
 * 이 인수 객체를 통해 클라이언트는 조회하고자 하는 커리큘럼의 ID를 전달합니다.
 */
@ArgsType()
export class CurriculumArgs {
  @Field(() => Int)
  id: number;
}
