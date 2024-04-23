import { Test, TestingModule } from '@nestjs/testing';
import { CourseVideoController } from './course.video.controller';

describe('CourseVideoController', () => {
  let controller: CourseVideoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseVideoController],
    }).compile();

    controller = module.get<CourseVideoController>(CourseVideoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
