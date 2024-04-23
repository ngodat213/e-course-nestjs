import { Test, TestingModule } from '@nestjs/testing';
import { ExamHistoryController } from './exam.history.controller';

describe('ExamHistoryController', () => {
  let controller: ExamHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExamHistoryController],
    }).compile();

    controller = module.get<ExamHistoryController>(ExamHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
