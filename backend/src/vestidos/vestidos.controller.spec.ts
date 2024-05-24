import { Test, TestingModule } from '@nestjs/testing';
import { VestidosController } from './vestidos.controller';

describe('VestidosController', () => {
  let controller: VestidosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VestidosController],
    }).compile();

    controller = module.get<VestidosController>(VestidosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
