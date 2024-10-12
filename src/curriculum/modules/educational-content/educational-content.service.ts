import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  DataSource,
  DeepPartial,
  EntityManager,
  FindManyOptions,
  FindOneOptions,
} from 'typeorm';
import { EducationalContentEntity } from './entities/educational-content.entity';
import { EducationalContentSnapshotEntity } from './entities/educational-content-snapshot.entity';

@Injectable()
export class EducationalContentService {
  constructor(private readonly dataSource: DataSource) {}

  // (공통) EntityManager가 주입되지 않을 경우, 기본 EntityManager를 생성합니다.
  // 이 매개변수는 트랜잭션 내에서 사용되며, 여러 작업을 하나의 트랜잭션으로 묶어야 할 때 사용됩니다.
  getEducationalContent(
    options: FindOneOptions<EducationalContentEntity>,
    entityManager?: EntityManager,
  ): Promise<EducationalContentEntity | null> {
    const em = entityManager ?? this.dataSource.createEntityManager();
    return em.findOne(EducationalContentEntity, options);
  }

  getEducationalContents(
    options: FindManyOptions<EducationalContentEntity> = {},
    entityManager?: EntityManager,
  ): Promise<EducationalContentEntity[]> {
    const em = entityManager ?? this.dataSource.createEntityManager();
    return em.find(EducationalContentEntity, options);
  }

  createEducationalContent(
    createData: DeepPartial<EducationalContentEntity>,
    entityManager?: EntityManager,
  ): Promise<EducationalContentEntity> {
    const em = entityManager ?? this.dataSource.createEntityManager();
    const educationalContent = em.create(EducationalContentEntity, createData);
    return em.save(EducationalContentEntity, educationalContent);
  }

  async updateEducationalContent(
    updateData: DeepPartial<EducationalContentEntity>,
    entityManager?: EntityManager,
  ): Promise<EducationalContentEntity> {
    const em = entityManager ?? this.dataSource.createEntityManager();

    const { id, ...filteredUpdateData } = updateData;
    const educationalContent = await this.getEducationalContent(
      {
        where: {
          id,
        },
      },
      em,
    );
    if (!educationalContent || educationalContent === null) {
      throw new NotFoundException('educationContent not found');
    }

    const { educationalContentSnapshots } = filteredUpdateData;
    if (
      !educationalContentSnapshots ||
      educationalContentSnapshots.length <= 0
    ) {
      throw new BadRequestException('undefined educationalContentSnapshots');
    }

    const snapshotEntity = em.create(
      EducationalContentSnapshotEntity,
      Object.assign(educationalContentSnapshots[0], {
        educationalContentId: id,
      }),
    );
    const educationalContentSnapshot = await em.save(
      EducationalContentSnapshotEntity,
      snapshotEntity,
    );
    educationalContent.educationalContentSnapshots = [
      educationalContentSnapshot,
    ];

    return educationalContent;
  }

  async deleteEducationalContent(
    id: number,
    entityManager?: EntityManager,
  ): Promise<void> {
    const em = entityManager ?? this.dataSource.createEntityManager();
    // softRemove와 동일하게 데이터가 물리적으로 삭제되지 않습니다.
    await em.softDelete(EducationalContentEntity, id);
  }
}
