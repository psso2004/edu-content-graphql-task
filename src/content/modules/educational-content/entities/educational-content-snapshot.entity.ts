import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EducationalContentEntity } from './educational-content.entity';
import { CurriculumSnapshotEducationalContentSnapshotEntity } from 'src/curriculum/entities/curriculum-snapshot-educational-content-snapshot.entity';

@Entity('educational_content_snapshots')
export class EducationalContentSnapshotEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  educationalContentId: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'text' })
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  /**
   * =================== relations ===================
   */
  @ManyToOne(
    () => EducationalContentEntity,
    (educationalContent) => educationalContent.educationalContentSnapshots,
  )
  @JoinColumn({ name: 'educational_content_id' })
  educationalContent: EducationalContentEntity;

  @OneToMany(
    () => CurriculumSnapshotEducationalContentSnapshotEntity,
    (curriculumSnapshotEducationalContentSnapshot) =>
      curriculumSnapshotEducationalContentSnapshot.educationalContentSnapshot,
  )
  curriculumSnapshotEducationalContentSnapshots: CurriculumSnapshotEducationalContentSnapshotEntity[];
  /**
   * =================================================
   */
}
