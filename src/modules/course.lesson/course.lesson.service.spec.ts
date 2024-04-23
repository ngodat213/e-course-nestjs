import { Test, TestingModule } from '@nestjs/testing';
import { CourseLessonService } from './course.lesson.service';

describe('CourseLessonService', () => {
  let service: CourseLessonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourseLessonService],
    }).compile();

    service = module.get<CourseLessonService>(CourseLessonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
