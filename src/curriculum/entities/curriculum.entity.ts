import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CurriculumSnapshotEntity } from './curriculum-snapshot.entity';

@Entity('curriculums')
export class CurriculumEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  /**
   * =================== relations ===================
   */
  @OneToMany(
    () => CurriculumSnapshotEntity,
    (snapshot) => snapshot.curriculum,
    { cascade: ['insert', 'soft-remove'] },
  )
  curriculumSnapshots: CurriculumSnapshotEntity[];
  /**
   * =================================================
   */
}
