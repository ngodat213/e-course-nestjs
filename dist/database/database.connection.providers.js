"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseConnectionProviders = void 0;
const database_constants_1 = require("./database.constants");
const mongodb_config_1 = require("../configs/mongodb.config");
const mongoose_1 = require("mongoose");
exports.databaseConnectionProviders = [
    {
        provide: database_constants_1.DATABASE_CONNECTION,
        useFactory: (dbConfig) => {
            const conn = (0, mongoose_1.createConnection)(dbConfig.uri, {});
            return conn;
        },
        inject: [mongodb_config_1.default.KEY],
    }
];
//# sourceMappingURL=database.connection.providers.js.map