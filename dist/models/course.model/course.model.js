"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCourseModel = void 0;
const mongoose_1 = require("mongoose");
const CourseSchema = new mongoose_1.Schema({
    _id: mongoose_1.SchemaTypes.ObjectId,
    courseImage: { type: mongoose_1.SchemaTypes.String, required: true },
    teacherId: { type: mongoose_1.SchemaTypes.ObjectId, ref: 'Teacher' },
    title: { type: mongoose_1.SchemaTypes.String, required: true },
    description: { type: mongoose_1.SchemaTypes.String, required: true },
    time: { type: mongoose_1.SchemaTypes.String, required: true },
    category: { type: mongoose_1.SchemaTypes.String, required: true },
    rating: { type: mongoose_1.SchemaTypes.Number, default: 5 },
    register: { type: mongoose_1.SchemaTypes.Number, required: true },
    lessons: { type: [{ type: mongoose_1.SchemaTypes.ObjectId, ref: 'CourseLesson' }] },
    feedbacks: { type: [{ type: mongoose_1.SchemaTypes.ObjectId, ref: 'Feedback' }] },
});
const createCourseModel = (connection) => connection.model('Course', CourseSchema, 'Courses');
exports.createCourseModel = createCourseModel;
//# sourceMappingURL=course.model.js.map