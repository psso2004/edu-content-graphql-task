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
import { CurriculumEntity } from './entities/curriculum.entity';
import { CurriculumSnapshotEntity } from './entities/curriculum-snapshot.entity';
import { CurriculumSnapshotEducationalContentSnapshotEntity } from './entities/curriculum-snapshot-educational-content-snapshot.entity';

@Injectable()
export class CurriculumService {
  constructor(private readonly dataSource: DataSource) {}

  // (공통) EntityManager가 주입되지 않을 경우, 기본 EntityManager를 생성합니다.
  // 이 매개변수는 트랜잭션 내에서 사용되며, 여러 작업을 하나의 트랜잭션으로 묶어야 할 때 사용됩니다.
  getCurriculum(
    where: FindOptionsWhere<CurriculumEntity>,
    entityManager?: EntityManager,
  ): Promise<CurriculumEntity | null> {
    const em = entityManager ?? this.dataSource.createEntityManager();
    return em.findOneBy(CurriculumEntity, where);
  }

  getCurriculums(
    options: FindManyOptions<CurriculumEntity> = {},
    entityManager?: EntityManager,
  ): Promise<CurriculumEntity[]> {
    const em = entityManager ?? this.dataSource.createEntityManager();
    return em.find(CurriculumEntity, options);
  }

  getCurriculumSnapshots(
    options: FindManyOptions<CurriculumSnapshotEntity> = {},
    entityManager?: EntityManager,
  ): Promise<CurriculumSnapshotEntity[]> {
    const em = entityManager ?? this.dataSource.createEntityManager();
    return em.find(CurriculumSnapshotEntity, options);
  }

  getUniqueCurriculumSnapshots(
    curriculumIds: number[],
    entityManager?: EntityManager,
  ): Promise<CurriculumSnapshotEntity[]> {
    const em = entityManager ?? this.dataSource.createEntityManager();
    return em
      .createQueryBuilder(CurriculumSnapshotEntity, 'snapshot')
      .where(
        `snapshot.id IN (${em
          .createQueryBuilder(CurriculumSnapshotEntity, 'innerSnapshot')
          .select('MAX(innerSnapshot.id)')
          .where(`innerSnapshot.curriculumId IN (${curriculumIds.join(',')})`)
          .groupBy('innerSnapshot.curriculumId')
          .getQuery()})`,
      )
      .getMany();
  }

  /**
   * 커리큘럼으로 묶여진 교육콘텐츠 스냅샷 엔티티들을 조회합니다.
   */
  getEducationalContentSnapshots(
    options: FindManyOptions<CurriculumSnapshotEducationalContentSnapshotEntity>,
    entityManager?: EntityManager,
  ): Promise<CurriculumSnapshotEducationalContentSnapshotEntity[]> {
    const em = entityManager ?? this.dataSource.createEntityManager();
    return em.find(CurriculumSnapshotEducationalContentSnapshotEntity, options);
  }

  createCurriculum(
    createData: DeepPartial<CurriculumEntity>,
    entityManager?: EntityManager,
  ): Promise<CurriculumEntity> {
    const em = entityManager ?? this.dataSource.createEntityManager();
    const curriculum = em.create(CurriculumEntity, createData);
    return em.save(curriculum);
  }

  async updateCurriculum(
    updateData: DeepPartial<CurriculumEntity>,
    entityManager?: EntityManager,
  ): Promise<CurriculumEntity> {
    const em = entityManager ?? this.dataSource.createEntityManager();

    const updateCurriculumInternal = async (
      transactionalEntityManager: EntityManager,
    ) => {
      const { id, curriculumSnapshots, ...filteredUpdateData } = updateData;

      const curriculum = await this.getCurriculum(
        { id },
        transactionalEntityManager,
      );
      if (!curriculum || curriculum === null) {
        throw new NotFoundException('educationContent not found');
      }

      transactionalEntityManager.merge(
        CurriculumEntity,
        curriculum,
        filteredUpdateData,
      );
      await transactionalEntityManager.save(CurriculumEntity, curriculum);

      if (!curriculumSnapshots || curriculumSnapshots.length <= 0) {
        throw new BadRequestException('undefined curriculumSnapshots');
      }

      const snapshotEntity = transactionalEntityManager.create(
        CurriculumSnapshotEntity,
        Object.assign(curriculumSnapshots[0], {
          curriculumId: id,
        }),
      );
      const curriculumSnapshot = await transactionalEntityManager.save(
        CurriculumSnapshotEntity,
        snapshotEntity,
      );
      curriculum.curriculumSnapshots = [curriculumSnapshot];

      return curriculum;
    };

    // 외부에서 주입된 EntityManager가 있을 경우, 트랜잭션을 사용하지 않음
    if (entityManager) {
      return await updateCurriculumInternal(em);
    } else {
      return await em.transaction(async (transactionalEntityManager) => {
        return await updateCurriculumInternal(transactionalEntityManager);
      });
    }
  }

  async deleteCurriculum(
    id: number,
    entityManager?: EntityManager,
  ): Promise<void> {
    const em = entityManager ?? this.dataSource.createEntityManager();
    // softRemove와 동일하게 데이터가 물리적으로 삭제되지 않습니다.
    await em.softDelete(CurriculumEntity, id);
  }
}
