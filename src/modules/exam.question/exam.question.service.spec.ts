import { Test, TestingModule } from '@nestjs/testing';
import { ExamQuestionService } from './exam.question.service';

describe('ExamQuestionService', () => {
  let service: ExamQuestionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExamQuestionService],
    }).compile();

    service = module.get<ExamQuestionService>(ExamQuestionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
