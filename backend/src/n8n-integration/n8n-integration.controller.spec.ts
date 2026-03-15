import { Test, TestingModule } from '@nestjs/testing';
import { N8nIntegrationController } from './n8n-integration.controller';

describe('N8nIntegrationController', () => {
  let controller: N8nIntegrationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [N8nIntegrationController],
    }).compile();

    controller = module.get<N8nIntegrationController>(N8nIntegrationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
