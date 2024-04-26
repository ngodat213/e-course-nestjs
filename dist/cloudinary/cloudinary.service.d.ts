/// <reference types="multer" />
import { CloudinaryResponse } from './cloudinary-response';
export declare class CloudinaryService {
    uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse>;
}
