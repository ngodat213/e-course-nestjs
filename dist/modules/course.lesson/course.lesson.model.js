"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCourseLessonModel = void 0;
const mongoose_1 = require("mongoose");
const CourseLessonSchema = new mongoose_1.Schema({
    title: { type: mongoose_1.SchemaTypes.String, required: true },
    selection: { type: mongoose_1.SchemaTypes.Number, required: true },
    course: { type: mongoose_1.SchemaTypes.ObjectId, ref: 'Course' },
    deleteAt: { type: mongoose_1.SchemaTypes.Date, default: null },
});
const createCourseLessonModel = (connection) => connection.model('CourseLesson', CourseLessonSchema, 'CourseLessons');
exports.createCourseLessonModel = createCourseLessonModel;
//# sourceMappingURL=course.lesson.model.js.map