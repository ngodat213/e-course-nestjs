import { Test, TestingModule } from '@nestjs/testing';
import { ExamLessonService } from './exam.lesson.service';

describe('ExamLessonService', () => {
  let service: ExamLessonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExamLessonService],
    }).compile();

    service = module.get<ExamLessonService>(ExamLessonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
