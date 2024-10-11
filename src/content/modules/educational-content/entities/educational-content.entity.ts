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
import { EducationalContentSnapshotEntity } from './educational-content-snapshot.entity';

@Entity('educational_contents')
export class EducationalContentEntity {
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
  @OneToOne(() => EducationalContentSnapshotEntity, { nullable: true })
  @JoinColumn({ name: 'final_snapshot_id' })
  finalSnapshot: EducationalContentSnapshotEntity | null;

  @OneToMany(
    () => EducationalContentSnapshotEntity,
    (snapshot) => snapshot.educationalContent,
    { cascade: ['insert', 'soft-remove'] },
  )
  educationalContentSnapshots: EducationalContentSnapshotEntity[];
  /**
   * =================================================
   */
}
