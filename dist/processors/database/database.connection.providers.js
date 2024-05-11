"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseConnectionProviders = void 0;
const database_constants_1 = require("./database.constants");
const APP_CONFIG = require("../../app.config");
const mongoose_1 = require("mongoose");
exports.databaseConnectionProviders = [
    {
        provide: database_constants_1.DATABASE_CONNECTION,
        useFactory: () => {
            const conn = (0, mongoose_1.createConnection)(APP_CONFIG.MONGODB.uri, {});
            return conn;
        },
    }
];
//# sourceMappingURL=database.connection.providers.js.map