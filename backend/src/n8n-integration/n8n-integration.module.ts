import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { N8nIntegrationService } from './n8n-integration.service';
import { N8nIntegrationController } from './n8n-integration.controller';

@Module({
  imports: [HttpModule],
  providers: [N8nIntegrationService],
  controllers: [N8nIntegrationController]
})
export class N8nIntegrationModule {}
