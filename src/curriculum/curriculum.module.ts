import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurriculumEntity } from './entities/curriculum.entity';
import { CurriculumSnapshotEntity } from './entities/curriculum-snapshot.entity';
import { CurriculumSnapshotEducationalContentSnapshotEntity } from './entities/curriculum-snapshot-educational-content-snapshot.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CurriculumEntity,
      CurriculumSnapshotEntity,
      CurriculumSnapshotEducationalContentSnapshotEntity,
    ]),
  ],
})
export class CurriculumModule {}
