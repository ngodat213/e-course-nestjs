"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('cloudinary', () => ({
    cloud_name: process.env.CLOUDINARY_NAME || "duhncgkpo",
    api_key: process.env.CLOUDINARY_API_KEY || "425358843362883",
    api_secret: process.env.CLOUDINARY_API_SECRET || "LWXbOOgeXvXmo2ASjXtpeIr6w1U",
}));
//# sourceMappingURL=clouldinary.config.js.map