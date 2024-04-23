import { Test, TestingModule } from '@nestjs/testing';
import { CourseVideoService } from './course.video.service';

describe('CourseVideoService', () => {
  let service: CourseVideoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourseVideoService],
    }).compile();

    service = module.get<CourseVideoService>(CourseVideoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
