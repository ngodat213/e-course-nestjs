// cloudinary.module.ts
import { Module } from '@nestjs/common';
import { CloudinaryProvider } from './cloudinary.provider';
import { CloudinaryService } from './cloudinary.service';
import { ConfigModule } from '@nestjs/config';
import cloudinaryConfig  from '../configs/clouldinary.config';

@Module({
  imports: [ConfigModule.forFeature(cloudinaryConfig)],
  providers: [...CloudinaryProvider, CloudinaryService],
  exports: [...CloudinaryProvider, CloudinaryService]
})
export class CloudinaryModule {}
