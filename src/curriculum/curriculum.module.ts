import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurriculumEntity } from './entities/curriculum.entity';
import { CurriculumSnapshotEntity } from './entities/curriculum-snapshot.entity';
import { CurriculumSnapshotEducationalContentSnapshotEntity } from './entities/curriculum-snapshot-educational-content-snapshot.entity';
import { CurriculumResolver } from './curriculum.resolver';
import { CurriculumSnapshotResolver } from './curriculum-snapshot.resolver';
import { EducationalContentModule } from './modules/educational-content/educational-content.module';
import { CurriculumService } from './curriculum.service';
import { LatestCurriculumSnapshotLoader } from './loaders/latest-curriculum-snapshot.loader';
import { CurriculumSnapshotsLoader } from './loaders/curriculum-snapshots.loader';
import { EducationalContentSnapshotsLoader } from './loaders/education-content-snapshots.loader';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CurriculumEntity,
      CurriculumSnapshotEntity,
      CurriculumSnapshotEducationalContentSnapshotEntity,
    ]),
    EducationalContentModule,
  ],
  providers: [
    /**
     * === resolvers ===
     */
    CurriculumResolver,
    CurriculumSnapshotResolver,
    /**
     * === services ===
     */
    CurriculumService,
    /**
     * === dataloaders ===
     */
    LatestCurriculumSnapshotLoader,
    CurriculumSnapshotsLoader,
    EducationalContentSnapshotsLoader,
  ],
})
export class CurriculumModule {}
