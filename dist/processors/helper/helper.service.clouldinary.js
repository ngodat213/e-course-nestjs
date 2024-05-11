"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryService = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_1 = require("cloudinary");
const cloudinary_2 = require("cloudinary");
const APP_CONFIG = require("../../app.config");
const streamifier = require('streamifier');
let CloudinaryService = class CloudinaryService {
    constructor() {
        this.createClould();
    }
    createClould() {
        return cloudinary_2.v2.config({
            cloud_name: APP_CONFIG.CLOUDINARY.cloud_name,
            api_key: APP_CONFIG.CLOUDINARY.api_key,
            api_secret: APP_CONFIG.CLOUDINARY.api_secret,
        });
    }
    uploadFile(file, folder, filename_override, resource_type) {
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary_2.v2.uploader.upload_stream({ folder: folder, filename_override: filename_override, resource_type: resource_type }, (error, result) => {
                if (error)
                    return reject(error);
                resolve(result);
            });
            streamifier.createReadStream(file.buffer).pipe(uploadStream);
        });
    }
    destroyFile(publicId) {
        console.log('this is public id', publicId);
        return new Promise((resolve, reject) => {
            cloudinary_1.v2.uploader.destroy(publicId, { invalidate: true }, (error, result) => {
                if (error) {
                    console.error('Error deleting resource:', error);
                    reject(error);
                }
                else {
                    console.log('Resource deleted successfully:', result);
                    resolve(result);
                }
            });
        });
    }
};
exports.CloudinaryService = CloudinaryService;
exports.CloudinaryService = CloudinaryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], CloudinaryService);
//# sourceMappingURL=helper.service.clouldinary.js.map