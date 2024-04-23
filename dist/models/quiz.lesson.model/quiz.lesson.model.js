"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createQuizLessonModel = void 0;
const mongoose_1 = require("mongoose");
const QuizLessonSchema = new mongoose_1.Schema({});
const createQuizLessonModel = (connection) => connection.model('QuizLesson', QuizLessonSchema, 'QuizLessons');
exports.createQuizLessonModel = createQuizLessonModel;
//# sourceMappingURL=quiz.lesson.model.js.map