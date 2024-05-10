/// <reference types="multer" />
import { CloudinaryResponse } from './cloudinary-response';
export declare class CloudinaryService {
    uploadFile(file: Express.Multer.File, folder: string, filename_override: string, resource_type: any): Promise<CloudinaryResponse>;
}
