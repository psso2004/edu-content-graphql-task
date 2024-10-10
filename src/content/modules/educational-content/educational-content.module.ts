import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EducationalContentEntity } from './entities/educational-content.entity';
import { EducationalContentSnapshotEntity } from './entities/educational-content-snapshot.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EducationalContentEntity,
      EducationalContentSnapshotEntity,
    ]),
  ],
})
export class EducationalContentModule {}
