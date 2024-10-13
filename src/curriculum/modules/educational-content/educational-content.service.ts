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
  FindOptionsWhere,
} from 'typeorm';
import { EducationalContentEntity } from './entities/educational-content.entity';
import { EducationalContentSnapshotEntity } from './entities/educational-content-snapshot.entity';

@Injectable()
export class EducationalContentService {
  constructor(private readonly dataSource: DataSource) {}

  // (공통) EntityManager가 주입되지 않을 경우, 기본 EntityManager를 생성합니다.
  // 이 매개변수는 트랜잭션 내에서 사용되며, 여러 작업을 하나의 트랜잭션으로 묶어야 할 때 사용됩니다.
  getEducationalContent(
    where: FindOptionsWhere<EducationalContentEntity>,
    entityManager?: EntityManager,
  ): Promise<EducationalContentEntity | null> {
    const em = entityManager ?? this.dataSource.createEntityManager();
    return em.findOneBy(EducationalContentEntity, where);
  }

  getEducationalContents(
    options: FindManyOptions<EducationalContentEntity> = {},
    entityManager?: EntityManager,
  ): Promise<EducationalContentEntity[]> {
    const em = entityManager ?? this.dataSource.createEntityManager();
    return em.find(EducationalContentEntity, options);
  }

  getEducationalContentCount(
    where: FindOptionsWhere<EducationalContentEntity> = {},
  ): Promise<number> {
    const repo = this.dataSource.getRepository(EducationalContentEntity);
    return repo.countBy(where);
  }

  getEducationalContentSnapshots(
    options: FindManyOptions<EducationalContentSnapshotEntity> = {},
    entityManager?: EntityManager,
  ): Promise<EducationalContentSnapshotEntity[]> {
    const em = entityManager ?? this.dataSource.createEntityManager();
    return em.find(EducationalContentSnapshotEntity, options);
  }

  getUniqueEducationalContentSnapshots(
    educationalContentIds: number[],
    entityManager?: EntityManager,
  ): Promise<EducationalContentSnapshotEntity[]> {
    const em = entityManager ?? this.dataSource.createEntityManager();
    return em
      .createQueryBuilder(EducationalContentSnapshotEntity, 'snapshot')
      .where(
        `snapshot.id IN (${em
          .createQueryBuilder(EducationalContentSnapshotEntity, 'innerSnapshot')
          .select('MAX(innerSnapshot.id)')
          .where(
            `innerSnapshot.educationalContentId IN (${educationalContentIds.join(
              ',',
            )})`,
          )
          .groupBy('innerSnapshot.educationalContentId')
          .getQuery()})`,
      )
      .getMany();
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

    const updateEducationalContentInternal = async (
      transactionalEntityManager: EntityManager,
    ) => {
      const { id, educationalContentSnapshots, ...filteredUpdateData } =
        updateData;

      const educationalContent = await this.getEducationalContent(
        { id },
        transactionalEntityManager,
      );
      if (!educationalContent || educationalContent === null) {
        throw new NotFoundException('educationContent not found');
      }

      transactionalEntityManager.merge(
        EducationalContentEntity,
        educationalContent,
        filteredUpdateData,
      );
      await transactionalEntityManager.save(
        EducationalContentEntity,
        educationalContent,
      );

      if (
        !educationalContentSnapshots ||
        educationalContentSnapshots.length <= 0
      ) {
        throw new BadRequestException('undefined educationalContentSnapshots');
      }

      const snapshotEntity = transactionalEntityManager.create(
        EducationalContentSnapshotEntity,
        Object.assign(educationalContentSnapshots[0], {
          educationalContentId: id,
        }),
      );
      const educationalContentSnapshot = await transactionalEntityManager.save(
        EducationalContentSnapshotEntity,
        snapshotEntity,
      );
      educationalContent.educationalContentSnapshots = [
        educationalContentSnapshot,
      ];

      return educationalContent;
    };

    // 외부에서 주입된 EntityManager가 있을 경우, 트랜잭션을 사용하지 않음
    if (entityManager) {
      return await updateEducationalContentInternal(em);
    } else {
      return await em.transaction(async (transactionalEntityManager) => {
        return await updateEducationalContentInternal(
          transactionalEntityManager,
        );
      });
    }
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
