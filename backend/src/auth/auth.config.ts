/**
 * Configuração de autenticação personalizada
 * Configurações básicas para o sistema de autenticação do MVP
 */

export interface AuthConfig {
  jwt: {
    secret: string;
    expiresIn: string;
  };
  bcrypt: {
    saltRounds: number;
  };
  session: {
    expiresIn: number; // segundos
    cookieName: string;
  };
}

export const authConfig: AuthConfig = {
  jwt: {
    secret: process.env.JWT_SECRET || 'seu-jwt-secret-super-seguro-aqui',
    expiresIn: '7d',
  },
  bcrypt: {
    saltRounds: 12,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 dias em segundos
    cookieName: 'auth-session',
  },
};

// Configuração do banco de dados
export const databaseConfig = {
  url:
    process.env.DATABASE_URL ||
    'postgresql://nextjstestedb_owner:npg_aYor3jMgi4JG@ep-divine-bonus-ac63unww-pooler.sa-east-1.aws.neon.tech/nextjstestedb?sslmode=require',
  ssl: {
    rejectUnauthorized: false,
  },
};
