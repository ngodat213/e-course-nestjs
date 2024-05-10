import { v2 as cloudinary } from 'cloudinary';
import { CLOUDINARY } from './clouddinary.constants';
import { ConfigType } from '@nestjs/config';
import cloudinaryConfig  from '../configs/clouldinary.config';

export const CloudinaryProvider = [{
  provide: CLOUDINARY,
  useFactory: (config: ConfigType<typeof cloudinaryConfig>) => {
    return cloudinary.config({
        cloud_name: config.cloud_name,
        api_key: config.api_key,
        api_secret: config.api_secret,
    });
  },
  inject: [cloudinaryConfig.KEY],
}];
