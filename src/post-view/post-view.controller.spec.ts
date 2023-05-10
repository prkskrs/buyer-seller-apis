import { Test, TestingModule } from '@nestjs/testing';
import { PostViewController } from './post-view.controller';

describe('PostViewController', () => {
  let controller: PostViewController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostViewController],
    }).compile();

    controller = module.get<PostViewController>(PostViewController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
