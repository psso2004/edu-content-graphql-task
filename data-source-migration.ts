import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const migrationsDir = process.env.MIGRATIONS_DIR || './migrations/*{.ts,.js}';

export default new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'pung',
  password: 'pungPassword!23',
  database: 'codestates',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: [migrationsDir],
  migrationsTableName: 'migrations',
  namingStrategy: new SnakeNamingStrategy(),
});
