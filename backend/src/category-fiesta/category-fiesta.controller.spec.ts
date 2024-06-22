import { Test, TestingModule } from '@nestjs/testing';
import { CategoryFiestaController } from './category-fiesta.controller';

describe('CategoryFiestaController', () => {
  let controller: CategoryFiestaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryFiestaController],
    }).compile();

    controller = module.get<CategoryFiestaController>(CategoryFiestaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
