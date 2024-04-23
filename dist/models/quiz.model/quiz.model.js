"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createQuizModel = void 0;
const mongoose_1 = require("mongoose");
const QuizSchema = new mongoose_1.Schema({
    _id: mongoose_1.SchemaTypes.ObjectId,
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    imageUrl: { type: String, required: true },
    lessons: { type: [{ type: mongoose_1.SchemaTypes.ObjectId, ref: 'QuizLesson' }] },
});
const createQuizModel = (connection) => connection.model('Quiz', QuizSchema, 'Quizs');
exports.createQuizModel = createQuizModel;
//# sourceMappingURL=quiz.model.js.map