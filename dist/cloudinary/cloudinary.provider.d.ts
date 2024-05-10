import { ConfigType } from '@nestjs/config';
import cloudinaryConfig from '../configs/clouldinary.config';
export declare const CloudinaryProvider: {
    provide: string;
    useFactory: (config: ConfigType<typeof cloudinaryConfig>) => import("cloudinary").ConfigOptions;
    inject: string[];
}[];
