import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url:
    process.env.DATABASE_URL ||
    'postgresql://nextjstestedb_owner:npg_aYor3jMgi4JG@ep-divine-bonus-ac63unww-pooler.sa-east-1.aws.neon.tech/nextjstestedb?sslmode=require',
  autoLoadEntities: true,
  synchronize: process.env.NODE_ENV === 'development', // Apenas em desenvolvimento
  logging: process.env.NODE_ENV === 'development',
  ssl: {
    rejectUnauthorized: false,
  },
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};
