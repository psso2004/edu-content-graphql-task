import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1728842389302 implements MigrationInterface {
    name = 'Migration1728842389302'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`educational_contents\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`educational_content_snapshots\` (\`id\` int NOT NULL AUTO_INCREMENT, \`educational_content_id\` int NOT NULL, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`content\` text NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`curriculum_snapshot_educational_content_snapshots\` (\`id\` int NOT NULL AUTO_INCREMENT, \`curriculum_snapshot_id\` int NOT NULL, \`educational_content_snapshot_id\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`curriculum_snapshots\` (\`id\` int NOT NULL AUTO_INCREMENT, \`curriculum_id\` int NOT NULL, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`content\` text NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`curriculums\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`educational_content_snapshots\` ADD CONSTRAINT \`FK_234c3f378f37077bc31de072efb\` FOREIGN KEY (\`educational_content_id\`) REFERENCES \`educational_contents\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`curriculum_snapshot_educational_content_snapshots\` ADD CONSTRAINT \`FK_93032daf1460514330dc506f79d\` FOREIGN KEY (\`curriculum_snapshot_id\`) REFERENCES \`curriculum_snapshots\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`curriculum_snapshot_educational_content_snapshots\` ADD CONSTRAINT \`FK_294574bfd06a20017d909284c86\` FOREIGN KEY (\`educational_content_snapshot_id\`) REFERENCES \`educational_content_snapshots\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`curriculum_snapshots\` ADD CONSTRAINT \`FK_d58321ae7495e7071003600f6cc\` FOREIGN KEY (\`curriculum_id\`) REFERENCES \`curriculums\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`curriculum_snapshots\` DROP FOREIGN KEY \`FK_d58321ae7495e7071003600f6cc\``);
        await queryRunner.query(`ALTER TABLE \`curriculum_snapshot_educational_content_snapshots\` DROP FOREIGN KEY \`FK_294574bfd06a20017d909284c86\``);
        await queryRunner.query(`ALTER TABLE \`curriculum_snapshot_educational_content_snapshots\` DROP FOREIGN KEY \`FK_93032daf1460514330dc506f79d\``);
        await queryRunner.query(`ALTER TABLE \`educational_content_snapshots\` DROP FOREIGN KEY \`FK_234c3f378f37077bc31de072efb\``);
        await queryRunner.query(`DROP TABLE \`curriculums\``);
        await queryRunner.query(`DROP TABLE \`curriculum_snapshots\``);
        await queryRunner.query(`DROP TABLE \`curriculum_snapshot_educational_content_snapshots\``);
        await queryRunner.query(`DROP TABLE \`educational_content_snapshots\``);
        await queryRunner.query(`DROP TABLE \`educational_contents\``);
    }

}
