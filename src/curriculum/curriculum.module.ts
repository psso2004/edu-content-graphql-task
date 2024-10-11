import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurriculumEntity } from './entities/curriculum.entity';
import { CurriculumSnapshotEntity } from './entities/curriculum-snapshot.entity';
import { CurriculumSnapshotEducationalContentSnapshotEntity } from './entities/curriculum-snapshot-educational-content-snapshot.entity';
import { CurriculumResolver } from './curriculum.resolver';
import { CurriculumSnapshotResolver } from './curriculum-snapshot.resolver';
import { EducationalContentModule } from "./modules/educational-content/educational-content.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CurriculumEntity,
      CurriculumSnapshotEntity,
      CurriculumSnapshotEducationalContentSnapshotEntity,
    ]),
    EducationalContentModule,
  ],
  providers: [CurriculumResolver, CurriculumSnapshotResolver],
})
export class CurriculumModule {}
