"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCourseVideoModel = void 0;
const mongoose_1 = require("mongoose");
const CourseVideoSchema = new mongoose_1.Schema({
    part: { type: mongoose_1.SchemaTypes.Number, required: true },
    title: { type: mongoose_1.SchemaTypes.String, required: true },
    hour: { type: mongoose_1.SchemaTypes.Number, required: true },
    minute: { type: mongoose_1.SchemaTypes.Number, required: true },
    videoUrl: { type: mongoose_1.SchemaTypes.String, required: true },
    videoPublicId: { type: mongoose_1.SchemaTypes.String, required: true },
    lesson: { type: mongoose_1.SchemaTypes.ObjectId, ref: 'Lesson', required: true },
    deleteAt: { type: mongoose_1.SchemaTypes.Date, default: null },
}, { timestamps: true });
const createCourseVideoModel = (connection) => connection.model('CourseVideo', CourseVideoSchema, 'CourseVideos');
exports.createCourseVideoModel = createCourseVideoModel;
//# sourceMappingURL=course.video.model.js.map