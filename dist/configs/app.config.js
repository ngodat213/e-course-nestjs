"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GOOGLE = exports.AUTH = exports.MONGO_DB = void 0;
const yargs_1 = require("yargs");
const argv = yargs_1.default.argv;
exports.MONGO_DB = {
    uri: process.env.MONGODB_URI || `mongodb+srv://hydra:Code26102003@cluster0.d0dwiwa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
};
exports.AUTH = {
    expiresIn: argv.auth_expires_in || 3600,
    data: argv.auth_data || { user: 'root' },
    jwtSecret: argv.auth_key || 'ecourse',
    defaultPassword: argv.auth_default_password || 'root'
};
exports.GOOGLE = {
    jwtServiceAccountCredentials: argv.google_jwt_cred_json ? JSON.parse(argv.google_jwt_cred_json) : null
};
//# sourceMappingURL=app.config.js.map