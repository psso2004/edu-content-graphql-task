import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EducationalContentEntity } from './entities/educational-content.entity';
import { EducationalContentSnapshotEntity } from './entities/educational-content-snapshot.entity';
import { EducationalContentResolver } from './educational-content.resolver';
import { EducationalContentService } from './educational-content.service';
import { LatestSnapshotLoader } from './loaders/latest-snapshot.loader';
import { SnapshotsLoader } from './loaders/snapshots.loader';

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
    LatestSnapshotLoader,
    SnapshotsLoader,
  ],
  exports: [EducationalContentService],
})
export class EducationalContentModule {}
