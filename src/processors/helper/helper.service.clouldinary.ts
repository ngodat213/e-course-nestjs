import { Injectable } from "@nestjs/common";
import { UploadApiErrorResponse, UploadApiResponse, v2 } from "cloudinary";
import { v2 as cloudinary } from 'cloudinary';
import * as APP_CONFIG from '../../app.config'
const streamifier = require('streamifier');

export type CloudinaryResponse = UploadApiResponse | UploadApiErrorResponse;

@Injectable()
export class CloudinaryService{
  constructor(){
    this.createClould();
  }

  private createClould(){
    return cloudinary.config({
      cloud_name: APP_CONFIG.CLOUDINARY.cloud_name,
      api_key: APP_CONFIG.CLOUDINARY.api_key,
      api_secret: APP_CONFIG.CLOUDINARY.api_secret,
    });
  }
  
  uploadFile(file: Express.Multer.File, folder: string, filename_override: string, resource_type): Promise<CloudinaryResponse>{
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {folder: folder, filename_override: filename_override, resource_type: resource_type},
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }

  destroyFile(publicId: string): Promise<void> {
    console.log('this is public id', publicId);
    return new Promise((resolve, reject) => {
      v2.uploader.destroy(publicId, { invalidate: true }, (error, result) => {
        if (error) {
          console.error('Error deleting resource:', error);
          reject(error);
        } else {
          console.log('Resource deleted successfully:', result);
          resolve(result);
        }
      });
    });
  }
}