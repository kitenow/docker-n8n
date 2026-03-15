import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { N8nIntegrationModule } from './n8n-integration/n8n-integration.module';

@Module({
  imports: [PrismaModule, AuthModule, N8nIntegrationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
