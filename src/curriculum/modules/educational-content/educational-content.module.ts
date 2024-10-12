import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EducationalContentEntity } from './entities/educational-content.entity';
import { EducationalContentSnapshotEntity } from './entities/educational-content-snapshot.entity';
import { EducationalContentResolver } from './educational-content.resolver';
import { EducationalContentService } from './educational-content.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EducationalContentEntity,
      EducationalContentSnapshotEntity,
    ]),
  ],
  providers: [EducationalContentResolver, EducationalContentService],
})
export class EducationalContentModule {}
