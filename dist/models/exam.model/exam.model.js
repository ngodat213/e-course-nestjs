"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExamModel = void 0;
const mongoose_1 = require("mongoose");
const ExamSchema = new mongoose_1.Schema({
    _id: mongoose_1.SchemaTypes.ObjectId,
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    imageUrl: { type: String, required: true },
}, { timestamps: true });
const createExamModel = (connection) => connection.model('Exam', ExamSchema, 'Exams');
exports.createExamModel = createExamModel;
//# sourceMappingURL=exam.model.js.map