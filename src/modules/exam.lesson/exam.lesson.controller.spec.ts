import { Test, TestingModule } from '@nestjs/testing';
import { ExamLessonController } from './exam.lesson.controller';

describe('ExamLessonController', () => {
  let controller: ExamLessonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExamLessonController],
    }).compile();

    controller = module.get<ExamLessonController>(ExamLessonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
