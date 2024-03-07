import { Test, TestingModule } from '@nestjs/testing';
import { FxConversionController } from './fx-conversion.controller';
import { FxConversionService } from './fx-conversion.service';

describe('FxConversionController', () => {
  let fxConversionController: FxConversionController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [FxConversionController],
      providers: [FxConversionService],
    }).compile();

    fxConversionController = app.get<FxConversionController>(FxConversionController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(fxConversionController.getHello()).toBe('Hello World!');
    });
  });
});
