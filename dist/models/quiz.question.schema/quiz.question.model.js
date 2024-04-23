"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBlogModel = void 0;
const mongoose_1 = require("mongoose");
const QuizQuestionSchema = new mongoose_1.Schema({
    _id: mongoose_1.SchemaTypes.ObjectId,
    question: { type: mongoose_1.SchemaTypes.String, required: true },
    options: [{ type: mongoose_1.SchemaTypes.String, required: true }],
    answer: { type: mongoose_1.SchemaTypes.Number, required: true },
    imageUrl: { type: mongoose_1.SchemaTypes.String },
});
const createQuizQuestionModel = (connection) => connection.model('QuizQuestion', QuizQuestionSchema, 'QuizQuestions');
exports.createBlogModel = createQuizQuestionModel;
//# sourceMappingURL=quiz.question.model.js.map