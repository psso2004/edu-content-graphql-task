import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EducationalContentEntity } from './entities/educational-content.entity';
import { EducationalContentSnapshotEntity } from './entities/educational-content-snapshot.entity';
import { EducationalContentResolver } from './educational-content.resolver';
import { EducationalContentService } from './educational-content.service';
import { LatestEducationalContentSnapshotLoader } from './loaders/latest-educational-content-snapshot.loader';
import { EducationalContentSnapshotsLoader } from './loaders/educational-content-snapshots.loader';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EducationalContentEntity,
      EducationalContentSnapshotEntity,
    ]),
  ],
  providers: [
    /**
     * === resolvers ===
     */
    EducationalContentResolver,
    /**
     * === services ===
     */
    EducationalContentService,
    /**
     * === dataloaders ===
     */
    LatestEducationalContentSnapshotLoader,
    EducationalContentSnapshotsLoader,
  ],
  exports: [EducationalContentService],
})
export class EducationalContentModule {}
