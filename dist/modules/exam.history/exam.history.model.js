"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExamHistoryModel = void 0;
const mongoose_1 = require("mongoose");
const ExamHistorySchema = new mongoose_1.Schema({
    user: { type: mongoose_1.SchemaTypes.ObjectId, ref: 'User' },
    lesson: { type: mongoose_1.SchemaTypes.ObjectId, ref: 'ExamLesson' },
    point: { type: mongoose_1.SchemaTypes.Number, required: true },
    correct: { type: mongoose_1.SchemaTypes.Number, required: true },
    incorrect: { type: mongoose_1.SchemaTypes.Number, required: true },
    deleteAt: { type: mongoose_1.SchemaTypes.Date, default: null },
}, { timestamps: true });
const createExamHistoryModel = (connection) => connection.model('ExamHistory', ExamHistorySchema, 'ExamHistorys');
exports.createExamHistoryModel = createExamHistoryModel;
//# sourceMappingURL=exam.history.model.js.map