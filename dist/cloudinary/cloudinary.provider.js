"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryProvider = void 0;
const cloudinary_1 = require("cloudinary");
const clouddinary_constants_1 = require("./clouddinary.constants");
const clouldinary_config_1 = require("../configs/clouldinary.config");
exports.CloudinaryProvider = [{
        provide: clouddinary_constants_1.CLOUDINARY,
        useFactory: (config) => {
            return cloudinary_1.v2.config({
                cloud_name: config.cloud_name,
                api_key: config.api_key,
                api_secret: config.api_secret,
            });
        },
        inject: [clouldinary_config_1.default.KEY],
    }];
//# sourceMappingURL=cloudinary.provider.js.map