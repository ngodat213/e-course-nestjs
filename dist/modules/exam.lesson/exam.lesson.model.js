"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExamLessonModel = void 0;
const mongoose_1 = require("mongoose");
const ExamLessonSchema = new mongoose_1.Schema({
    title: { type: mongoose_1.SchemaTypes.String, required: true },
    hour: { type: mongoose_1.SchemaTypes.Number, required: true },
    minute: { type: mongoose_1.SchemaTypes.Number, required: true },
    second: { type: mongoose_1.SchemaTypes.Number, required: true },
    selection: { type: mongoose_1.SchemaTypes.Number, required: true },
    point: { type: mongoose_1.SchemaTypes.Number, required: true },
    exam: { type: mongoose_1.SchemaTypes.ObjectId, ref: 'Exam' },
    deleteAt: { type: mongoose_1.SchemaTypes.Date, default: null },
}, { timestamps: true });
const createExamLessonModel = (connection) => connection.model('ExamLesson', ExamLessonSchema, 'ExamLessons');
exports.createExamLessonModel = createExamLessonModel;
//# sourceMappingURL=exam.lesson.model.js.map