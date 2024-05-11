"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT = exports.MONGODB = exports.EMAIL = exports.CLOUDINARY = exports.APP = void 0;
exports.APP = {
    NAME: "ECourse",
    ADMIN_EMAIL: "noreply.ecourse@gmail.com"
};
exports.CLOUDINARY = {
    cloud_name: process.env.CLOUDINARY_NAME || "duhncgkpo",
    api_key: process.env.CLOUDINARY_API_KEY || "425358843362883",
    api_secret: process.env.CLOUDINARY_API_SECRET || "LWXbOOgeXvXmo2ASjXtpeIr6w1U",
};
exports.EMAIL = {
    host: process.env.MAIL_HOST || "smtp.gmail.com",
    secure: process.env.MAIL_SECURE || false,
    user: process.env.MAIL_USER || "noreply.ecourse@gmail.com",
    pass: process.env.MAIL_PASSWORD || "lcvcpjeypegntluj",
    from: `"No Reply" <${process.env.MAIL_TRANSPORT || `smtp://noreply.ecourse@gmail.com:lcvcpjeypegntluj@"smtp.gmail.com"`}>`
};
exports.MONGODB = {
    key: process.env.KEY || "mongodb",
    uri: process.env.MONGODB_URI || `mongodb+srv://hydra:Code26102003@cluster0.d0dwiwa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
};
exports.JWT = {
    global: true,
    secretKey: process.env.JWT_SECRET_KEY || 'hydracoder1993744',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
};
//# sourceMappingURL=app.config.js.map