import { Test, TestingModule } from '@nestjs/testing';
import { N8nIntegrationService } from './n8n-integration.service';

describe('N8nIntegrationService', () => {
  let service: N8nIntegrationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [N8nIntegrationService],
    }).compile();

    service = module.get<N8nIntegrationService>(N8nIntegrationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
