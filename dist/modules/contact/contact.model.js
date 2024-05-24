"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContactModel = void 0;
const mongoose_1 = require("mongoose");
const ContactSchema = new mongoose_1.Schema({
    fullName: { type: mongoose_1.SchemaTypes.String, required: true },
    mail: { type: mongoose_1.SchemaTypes.String, required: true },
    text: { type: mongoose_1.SchemaTypes.String, required: true },
    topic: { type: mongoose_1.SchemaTypes.String, required: true },
    watched: { type: mongoose_1.SchemaTypes.Boolean, default: false },
    deleteAt: { type: mongoose_1.SchemaTypes.Date, default: null },
}, { timestamps: true });
const createContactModel = (connection) => connection.model('Contact', ContactSchema, 'Contacts');
exports.createContactModel = createContactModel;
//# sourceMappingURL=contact.model.js.map