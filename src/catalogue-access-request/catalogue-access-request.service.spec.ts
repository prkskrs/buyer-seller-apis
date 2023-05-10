import { Test, TestingModule } from '@nestjs/testing';
import { CatalogueAccessRequestService } from './catalogue-access-request.service';

describe('CatalogueAccessRequestService', () => {
  let service: CatalogueAccessRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatalogueAccessRequestService],
    }).compile();

    service = module.get<CatalogueAccessRequestService>(CatalogueAccessRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
