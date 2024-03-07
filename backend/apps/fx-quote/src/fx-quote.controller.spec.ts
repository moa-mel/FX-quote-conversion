import { Test, TestingModule } from '@nestjs/testing';
import { FxQuoteController } from './fx-quote.controller';
import { FxQuoteService } from './fx-quote.service';

describe('FxQuoteController', () => {
  let fxQuoteController: FxQuoteController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [FxQuoteController],
      providers: [FxQuoteService],
    }).compile();

    fxQuoteController = app.get<FxQuoteController>(FxQuoteController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(fxQuoteController.getHello()).toBe('Hello World!');
    });
  });
});
