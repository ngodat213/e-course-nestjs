"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExamQuestionModel = void 0;
const mongoose_1 = require("mongoose");
const ExamQuestionSchema = new mongoose_1.Schema({
    _id: mongoose_1.SchemaTypes.ObjectId,
    question: { type: mongoose_1.SchemaTypes.String, required: true },
    options: [{ type: mongoose_1.SchemaTypes.String, required: true }],
    answer: { type: mongoose_1.SchemaTypes.Number, required: true },
    imageUrl: { type: mongoose_1.SchemaTypes.String, required: true },
    lesson: { type: mongoose_1.SchemaTypes.ObjectId, ref: 'ExamLesson' },
}, { timestamps: true });
const createExamQuestionModel = (connection) => connection.model('ExamQuestion', ExamQuestionSchema, 'ExamQuestions');
exports.createExamQuestionModel = createExamQuestionModel;
//# sourceMappingURL=exam.question.model.js.map