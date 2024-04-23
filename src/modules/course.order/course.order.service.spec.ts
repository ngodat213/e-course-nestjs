import { Test, TestingModule } from '@nestjs/testing';
import { CourseOrderService } from './course.order.service';

describe('CourseOrderService', () => {
  let service: CourseOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourseOrderService],
    }).compile();

    service = module.get<CourseOrderService>(CourseOrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
