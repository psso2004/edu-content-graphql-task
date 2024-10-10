import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CurriculumSnapshotEntity } from './curriculum-snapshot.entity';

@Entity('curriculums')
export class CurriculumEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  finalSnapshotId: number | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  /**
   * =================== relations ===================
   */
  @OneToOne(() => CurriculumSnapshotEntity, { nullable: true })
  @JoinColumn({ name: 'final_snapshot_id' })
  finalSnapshot: CurriculumSnapshotEntity | null;

  @OneToMany(
    () => CurriculumSnapshotEntity,
    (snapshot) => snapshot.curriculum,
    { cascade: ['insert'] },
  )
  curriculumSnapshots: CurriculumSnapshotEntity[];
  /**
   * =================================================
   */
}
