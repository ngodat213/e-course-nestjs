import { Test, TestingModule } from '@nestjs/testing';
import { CourseLessonController } from './course.lesson.controller';

describe('CourseLessonController', () => {
  let controller: CourseLessonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseLessonController],
    }).compile();

    controller = module.get<CourseLessonController>(CourseLessonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
