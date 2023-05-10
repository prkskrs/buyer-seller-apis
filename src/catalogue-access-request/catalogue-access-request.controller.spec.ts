import { Test, TestingModule } from '@nestjs/testing';
import { CatalogueAccessRequestController } from './catalogue-access-request.controller';

describe('CatalogueAccessRequestController', () => {
  let controller: CatalogueAccessRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatalogueAccessRequestController],
    }).compile();

    controller = module.get<CatalogueAccessRequestController>(CatalogueAccessRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
