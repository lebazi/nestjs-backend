import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule);

  // Configuração global de validação
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove propriedades não definidas nos DTOs
      forbidNonWhitelisted: true, // Rejeita requisições com propriedades não permitidas
      transform: true, // Transforma automaticamente os tipos
      errorHttpStatusCode: 400,
    }),
  );

  // Configuração de CORS
  app.enableCors({
    origin: [
      'http://localhost:3000', // Frontend em desenvolvimento
      'http://localhost:3001', // Backend
      process.env.FRONTEND_URL, // URL do frontend em produção
    ].filter(Boolean),
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization',
      'Cache-Control',
      'X-CSRF-Token',
    ],
    credentials: true, // Permite cookies e headers de autenticação
  });

  // Prefixo global para todas as rotas da API
  app.setGlobalPrefix('api');

  // Porta do servidor
  const port = process.env.PORT || 3001;

  await app.listen(port);

  logger.log(`🚀 Servidor rodando na porta ${port}`);
  logger.log(`📊 Documentação disponível em http://localhost:${port}/api`);
  logger.log(`🔗 Frontend conectado em http://localhost:3000`);
  logger.log(`💾 Banco de dados: Neon PostgreSQL`);
  logger.log(`🔐 Autenticação: Better-Auth`);
}

bootstrap().catch((error) => {
  console.error('Erro ao iniciar a aplicação:', error);
  process.exit(1);
});
