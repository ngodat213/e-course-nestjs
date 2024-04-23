"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCourseModel = void 0;
const mongoose_1 = require("mongoose");
const CourseSchema = new mongoose_1.Schema({
    _id: mongoose_1.SchemaTypes.ObjectId,
    title: { type: mongoose_1.SchemaTypes.String, required: true },
    price: { type: mongoose_1.SchemaTypes.Number, required: true },
    description: { type: mongoose_1.SchemaTypes.String, required: true },
    rating: { type: mongoose_1.SchemaTypes.Number, default: 5 },
    register: { type: mongoose_1.SchemaTypes.Number, required: true },
    imageIntroduce: { type: mongoose_1.SchemaTypes.String, required: true },
    imagePublicId: { type: mongoose_1.SchemaTypes.String, required: true },
    videoIntroduce: { type: mongoose_1.SchemaTypes.String, required: true },
    videoPublicId: { type: mongoose_1.SchemaTypes.String, required: true },
    time: { type: mongoose_1.SchemaTypes.String, required: true },
    language: { type: mongoose_1.SchemaTypes.String, required: true },
    updateAt: { type: mongoose_1.SchemaTypes.Date, required: true },
    createAt: { type: mongoose_1.SchemaTypes.Date, required: true },
    teacherId: { type: mongoose_1.SchemaTypes.ObjectId, ref: 'Teacher' },
    category: { type: mongoose_1.SchemaTypes.ObjectId, required: true, ref: 'Category' },
    feedbacks: { type: [{ type: mongoose_1.SchemaTypes.ObjectId, ref: 'Feedback' }] },
    lessons: { type: [{ type: mongoose_1.SchemaTypes.ObjectId, ref: 'CourseLesson' }] },
});
const createCourseModel = (connection) => connection.model('Course', CourseSchema, 'Courses');
exports.createCourseModel = createCourseModel;
//# sourceMappingURL=course.model.js.map