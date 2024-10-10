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
import { CurriculumEntity } from './curriculum.entity';
import { CurriculumSnapshotEducationalContentSnapshotEntity } from './curriculum-snapshot-educational-content-snapshot.entity';

@Entity('curriculum_snapshots')
export class CurriculumSnapshotEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  curriculumId: number;

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
    () => CurriculumEntity,
    (curriculum) => curriculum.curriculumSnapshots,
  )
  @JoinColumn({ name: 'curriculum_id' })
  curriculum: CurriculumEntity;

  @OneToMany(
    () => CurriculumSnapshotEducationalContentSnapshotEntity,
    (curriculumSnapshotEducationalContentSnapshot) =>
      curriculumSnapshotEducationalContentSnapshot.curriculumSnapshot,
  )
  curriculumSnapshotEducationalContentSnapshots: CurriculumSnapshotEducationalContentSnapshotEntity[];

  /**
   * =================================================
   */
}
