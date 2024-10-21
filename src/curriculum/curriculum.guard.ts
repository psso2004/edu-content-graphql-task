import {
  BadRequestException,
  CanActivate,
  createParamDecorator,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { EducationalContentService } from './modules/educational-content/educational-content.service';
import { GqlExecutionContext } from '@nestjs/graphql';

export const EducationalContentSnapshots = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().educationalContentSnapshots;
  },
);

@Injectable()
export class CurriculumGuard implements CanActivate {
  constructor(private educationalContentService: EducationalContentService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { input } = ctx.getArgs();
    const educationalContents = input.educationalContents;

    const educationalContentSnapshots =
      await this.educationalContentService.getUniqueEducationalContentSnapshots(
        educationalContents.map((educationalContent) => educationalContent.id),
      );

    if (educationalContentSnapshots.length <= 0) {
      throw new BadRequestException(
        'invalid educational content ids provided.',
      );
    }

    // 해당 리졸버에서 데코레이터로 값을 가져오기 위해 컨텍스트에 스냅샷 추가
    ctx.getContext().educationalContentSnapshots = educationalContentSnapshots;

    return true;
  }
}
