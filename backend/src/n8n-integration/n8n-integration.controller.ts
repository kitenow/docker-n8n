import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { N8nIntegrationService } from './n8n-integration.service';
import type { Request } from 'express';
import { SessionGuard } from '../auth/session.guard';

@UseGuards(SessionGuard)
@Controller('ai')
export class N8nIntegrationController {
  constructor(private readonly n8nIntegrationService: N8nIntegrationService) {}

  @Post('task')
  async triggerTask(@Body() body: any, @Req() req: Request) {
    const userId = (req.session as any).user.id;
    return this.n8nIntegrationService.triggerAiTask(body, userId);
  }
}
