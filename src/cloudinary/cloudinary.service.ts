import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, v2 } from 'cloudinary';
import { CloudinaryResponse } from './cloudinary-response';
const streamifier = require('streamifier');

@Injectable()
export class CloudinaryService {

  uploadFile(file: Express.Multer.File, folder: string, filename_override: string, resource_type): Promise<CloudinaryResponse> {
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
}
