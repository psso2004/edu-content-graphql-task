import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CurriculumSnapshotEntity } from './curriculum-snapshot.entity';
import { EducationalContentSnapshotEntity } from 'src/content/modules/educational-content/entities/educational-content-snapshot.entity';

@Entity('curriculum_snapshot_educational_content_snapshots')
export class CurriculumSnapshotEducationalContentSnapshotEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  curriculumSnapshotId: number;

  @Column()
  educationalContentSnapshotId: number;

  @CreateDateColumn()
  createdAt: Date;

  /**
   * =================== relations ===================
   */
  @ManyToOne(() => CurriculumSnapshotEntity, (snapshot) => snapshot)
  @JoinColumn({ name: 'curriculum_snapshot_id' })
  curriculumSnapshot: CurriculumSnapshotEntity;

  @ManyToOne(() => EducationalContentSnapshotEntity, (snapshot) => snapshot)
  @JoinColumn({ name: 'educational_content_snapshot_id' })
  educationalContentSnapshot: EducationalContentSnapshotEntity;
  /**
   * =================================================
   */
}
