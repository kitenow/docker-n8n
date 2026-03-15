import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';
import { Pool } from 'pg';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const pgPool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'n8n_user',
    password: process.env.DB_PASSWORD || 'n8n_secure_password',
    database: process.env.DB_NAME || 'n8n_db',
    port: 5432,
  });

  const pgSession = connectPgSimple(session);

  app.use(
    session({
      store: new pgSession({
        pool: pgPool,
        tableName: 'session', // Default table name
        createTableIfMissing: true, // Will automatically create the session table
      }),
      secret: process.env.SESSION_SECRET || 'super-secret-key', // In production, provide this via .env
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production', // uncomment in prod with https
      },
    }),
  );

  app.enableCors({
    origin: 'http://localhost:5173', // Vite default port
    credentials: true, // Allow cookies
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
