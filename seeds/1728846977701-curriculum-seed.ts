import { MigrationInterface, QueryRunner } from 'typeorm';

export class CurriculumSeed1728846977701 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `insert into educational_contents (id) values (1),(2),(3),(4),(5);`,
    );
    await queryRunner.query(
      `insert into educational_content_snapshots (educational_content_id, title, description, content) values (1, '첫 번째 교육 콘텐츠', '첫 번째 교육 콘텐츠입니다.', '첫 번째 교육 콘텐츠 내용입니다.');`,
    );
    await queryRunner.query(
      `insert into educational_content_snapshots (educational_content_id, title, description, content) values (2, '두 번째 교육 콘텐츠', '두 번째 교육 콘텐츠입니다.', '두 번째 교육 콘텐츠 내용입니다.');`,
    );
    await queryRunner.query(
      `insert into educational_content_snapshots (educational_content_id, title, description, content) values (3, '세 번째 교육 콘텐츠', '세 번째 교육 콘텐츠입니다.', '세 번째 교육 콘텐츠 내용입니다.');`,
    );
    await queryRunner.query(
      `insert into educational_content_snapshots (educational_content_id, title, description, content) values (4, '네 번째 교육 콘텐츠', '네 번째 교육 콘텐츠입니다.', '네 번째 교육 콘텐츠 내용입니다.');`,
    );
    await queryRunner.query(
      `insert into educational_content_snapshots (educational_content_id, title, description, content) values (5, '다섯 번째 교육 콘텐츠', '다섯 번째 교육 콘텐츠입니다.', '다섯 번째 교육 콘텐츠 내용입니다.');`,
    );

    await queryRunner.query(`insert into curriculums (id) values (1),(2),(3);`);
    await queryRunner.query(
      `insert into curriculum_snapshots (curriculum_id, title, description, content) ` +
        `values (1, '첫 번째 커리큘럼', '첫 번째 커리큘럼입니다.', '첫 번째 커리큘럼 내용입니다.'), ` +
        `(2, '두 번째 커리큘럼', '두 번째 커리큘럼입니다.', '두 번째 커리큘럼 내용입니다.'), ` +
        `(3, '세 번째 커리큘럼', '세 번째 커리큘럼입니다.', '세 번째 커리큘럼 내용입니다.');`,
    );

    await queryRunner.query(
      `insert into curriculum_snapshot_educational_content_snapshots (curriculum_snapshot_id, educational_content_snapshot_id) ` +
        `values  (1, 1),` +
        `(1, 2),` +
        `(2, 3),` +
        `(2, 4),` +
        `(3, 1),` +
        `(3, 5);`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
