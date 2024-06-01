"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCourseModel = void 0;
const mongoose_1 = require("mongoose");
const CourseSchema = new mongoose_1.Schema({
    title: { type: mongoose_1.SchemaTypes.String, required: true },
    price: { type: mongoose_1.SchemaTypes.Number, required: true },
    description: { type: mongoose_1.SchemaTypes.String, required: true },
    rating: { type: mongoose_1.SchemaTypes.Number, default: 5 },
    register: { type: mongoose_1.SchemaTypes.Number, default: 0 },
    reviews: { type: mongoose_1.SchemaTypes.Number, default: 0 },
    imageIntroduce: { type: mongoose_1.SchemaTypes.String, required: true },
    imagePublicId: { type: mongoose_1.SchemaTypes.String, required: true },
    videoIntroduce: { type: mongoose_1.SchemaTypes.String, required: true },
    videoPublicId: { type: mongoose_1.SchemaTypes.String, required: true },
    time: { type: mongoose_1.SchemaTypes.Number, required: true },
    language: { type: mongoose_1.SchemaTypes.String, required: true },
    teacher: { type: mongoose_1.SchemaTypes.ObjectId, ref: 'User', required: true },
    category: { type: mongoose_1.SchemaTypes.ObjectId, ref: 'Category', required: true },
    deleteAt: { type: mongoose_1.SchemaTypes.Date, default: null },
}, { timestamps: true });
const createCourseModel = (connection) => connection.model('Course', CourseSchema, 'Courses');
exports.createCourseModel = createCourseModel;
//# sourceMappingURL=course.model.js.map