import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EducationalContentSnapshotEntity } from './educational-content-snapshot.entity';

@Entity('educational_contents')
export class EducationalContentEntity {
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
    () => EducationalContentSnapshotEntity,
    (snapshot) => snapshot.educationalContent,
    { cascade: ['insert'] },
  )
  educationalContentSnapshots: EducationalContentSnapshotEntity[];
  /**
   * =================================================
   */
}
