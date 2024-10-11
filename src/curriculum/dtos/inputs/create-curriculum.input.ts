import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateCurriculumInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  content: string;

  /**
   * 교육 콘텐츠의 ID 목록을 포함하는 필드입니다.
   *
   * 특정 버전의 교육 콘텐츠를 묶음으로 구성할 필요가 있을 경우,
   * 스냅샷 ID를 받을 수 있도록 수정해야됩니다. (비즈니스 로직도 수정해야됩니다.)
   */
  @Field(() => [CurriculumEducationalContentInput])
  educationalContents: CurriculumEducationalContentInput[];
}

@InputType()
class CurriculumEducationalContentInput {
  @Field(() => Int)
  id: number;
}
