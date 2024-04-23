import { Test, TestingModule } from '@nestjs/testing';
import { CourseOrderController } from './course.order.controller';

describe('CourseOrderController', () => {
  let controller: CourseOrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseOrderController],
    }).compile();

    controller = module.get<CourseOrderController>(CourseOrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
