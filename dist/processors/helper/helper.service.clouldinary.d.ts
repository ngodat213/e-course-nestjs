/// <reference types="multer" />
import { UploadApiErrorResponse, UploadApiResponse } from "cloudinary";
export type CloudinaryResponse = UploadApiResponse | UploadApiErrorResponse;
export declare class CloudinaryService {
    constructor();
    private createClould;
    uploadFile(file: Express.Multer.File, folder: string, filename_override: string, resource_type: any): Promise<CloudinaryResponse>;
    destroyFile(publicId: string): Promise<void>;
}
