import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurriculumEntity } from './entities/curriculum.entity';
import { CurriculumSnapshotEntity } from './entities/curriculum-snapshot.entity';
import { CurriculumSnapshotEducationalContentSnapshotEntity } from './entities/curriculum-snapshot-educational-content-snapshot.entity';
import { CurriculumResolver } from './curriculum.resolver';
import { CurriculumSnapshotResolver } from './curriculum-snapshot.resolver';
import { EducationalContentModule } from './modules/educational-content/educational-content.module';
import { CurriculumService } from './curriculum.service';
import { LatestSnapshotLoader } from './loaders/latest-snapshot.loader';
import { SnapshotsLoader } from './loaders/snapshots.loader';

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
    LatestSnapshotLoader,
    SnapshotsLoader,
  ],
})
export class CurriculumModule {}
