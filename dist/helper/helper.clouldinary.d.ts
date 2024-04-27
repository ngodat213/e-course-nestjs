/// <reference types="multer" />
import { UploadApiErrorResponse, UploadApiResponse } from "cloudinary";
export type CloudinaryResponse = UploadApiResponse | UploadApiErrorResponse;
export declare class CloudinaryService {
    private createClould;
    uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse>;
}
