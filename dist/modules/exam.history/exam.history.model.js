"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExamHistoryModel = void 0;
const mongoose_1 = require("mongoose");
const ExamSubmitSchema = new mongoose_1.Schema({
    id: { type: mongoose_1.SchemaTypes.ObjectId, required: true, ref: 'ExamQuestion' },
    answer: { type: mongoose_1.SchemaTypes.Number, required: true }
}, { _id: false });
const ExamHistorySchema = new mongoose_1.Schema({
    user: { type: mongoose_1.SchemaTypes.ObjectId, ref: 'User' },
    lesson: { type: mongoose_1.SchemaTypes.ObjectId, ref: 'ExamLesson' },
    point: { type: mongoose_1.SchemaTypes.Number, required: true },
    correct: { type: [{ type: mongoose_1.SchemaTypes.ObjectId, ref: 'ExamQuestion' }] },
    questions: { type: [{ type: mongoose_1.SchemaTypes.ObjectId, ref: 'ExamQuestion' }] },
    examSubmit: { type: [ExamSubmitSchema], required: true },
    deleteAt: { type: mongoose_1.SchemaTypes.Date, default: null },
}, { timestamps: true });
const createExamHistoryModel = (connection) => connection.model('ExamHistory', ExamHistorySchema, 'ExamHistorys');
exports.createExamHistoryModel = createExamHistoryModel;
//# sourceMappingURL=exam.history.model.js.map