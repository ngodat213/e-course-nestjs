"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExamModel = void 0;
const mongoose_1 = require("mongoose");
const ExamSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    imagePublicId: { type: String, required: true },
    category: { type: mongoose_1.SchemaTypes.ObjectId, ref: 'Category', required: true },
    deleteAt: { type: mongoose_1.SchemaTypes.Date, default: null },
}, { timestamps: true });
const createExamModel = (connection) => connection.model('Exam', ExamSchema, 'Exams');
exports.createExamModel = createExamModel;
//# sourceMappingURL=exam.model.js.map