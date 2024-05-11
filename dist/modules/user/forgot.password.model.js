"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createForgotPasswordModel = void 0;
const mongoose_1 = require("mongoose");
const ForgotPasswordSchema = new mongoose_1.Schema({
    email: { type: mongoose_1.SchemaTypes.String, unique: true, required: true, match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ },
    newPasswordToken: { type: mongoose_1.SchemaTypes.String, required: true },
    timestamp: { type: mongoose_1.SchemaTypes.Date, required: true },
}, { timestamps: true });
const createForgotPasswordModel = (connection) => connection.model('ForgotPassword', ForgotPasswordSchema, 'ForgotPasswords');
exports.createForgotPasswordModel = createForgotPasswordModel;
//# sourceMappingURL=forgot.password.model.js.map