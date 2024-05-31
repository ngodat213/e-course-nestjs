"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExamQuestionModel = void 0;
const mongoose_1 = require("mongoose");
const ExamQuestionSchema = new mongoose_1.Schema({
    question: { type: mongoose_1.SchemaTypes.String, required: true },
    options: [{ type: mongoose_1.SchemaTypes.String, required: true }],
    answer: { type: mongoose_1.SchemaTypes.Number, required: true },
    imageUrl: { type: mongoose_1.SchemaTypes.String, default: null },
    imagePublicId: { type: mongoose_1.SchemaTypes.String, default: null },
    lesson: { type: mongoose_1.SchemaTypes.ObjectId, ref: 'ExamLesson' },
    deleteAt: { type: mongoose_1.SchemaTypes.Date, default: null },
}, { timestamps: true });
const createExamQuestionModel = (connection) => connection.model('ExamQuestion', ExamQuestionSchema, 'ExamQuestions');
exports.createExamQuestionModel = createExamQuestionModel;
//# sourceMappingURL=exam.question.model.js.map