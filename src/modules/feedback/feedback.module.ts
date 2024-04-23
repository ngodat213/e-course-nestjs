import { Module } from '@nestjs/common';
import { FeedbackController } from './feedback.controller';

@Module({
  controllers: [FeedbackController]
})
export class FeedbackModule {}
