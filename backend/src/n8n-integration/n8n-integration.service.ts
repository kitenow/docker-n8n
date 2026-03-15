import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class N8nIntegrationService {
  constructor(private readonly httpService: HttpService) {}

  async triggerAiTask(payload: any, userId: string) {
    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    if (!webhookUrl) {
      throw new InternalServerErrorException('n8n webhook URL is not configured');
    }

    try {
      const response = await lastValueFrom(
        this.httpService.post(webhookUrl, {
          userId,
          ...payload,
        }),
      );
      return response.data;
    } catch (error) {
      throw new InternalServerErrorException('Failed to trigger AI task in n8n');
    }
  }
}
