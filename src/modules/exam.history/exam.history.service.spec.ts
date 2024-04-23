import { Test, TestingModule } from '@nestjs/testing';
import { ExamHistoryService } from './exam.history.service';

describe('ExamHistoryService', () => {
  let service: ExamHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExamHistoryService],
    }).compile();

    service = module.get<ExamHistoryService>(ExamHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
