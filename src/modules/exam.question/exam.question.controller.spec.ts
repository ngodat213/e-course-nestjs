import { Test, TestingModule } from '@nestjs/testing';
import { ExamQuestionController } from './exam.question.controller';

describe('ExamQuestionController', () => {
  let controller: ExamQuestionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExamQuestionController],
    }).compile();

    controller = module.get<ExamQuestionController>(ExamQuestionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
