import { Test, TestingModule } from '@nestjs/testing';
import { VestidosFiestaController } from './vestidos-fiesta.controller';

describe('VestidosFiestaController', () => {
  let controller: VestidosFiestaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VestidosFiestaController],
    }).compile();

    controller = module.get<VestidosFiestaController>(VestidosFiestaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
