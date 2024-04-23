"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTeacherModel = void 0;
const mongoose_1 = require("mongoose");
const TeacherSchema = new mongoose_1.Schema({
    _id: mongoose_1.SchemaTypes.ObjectId,
    description: { type: mongoose_1.SchemaTypes.String, required: true },
    courses: [{ type: mongoose_1.SchemaTypes.ObjectId, ref: "Course" }],
    quizs: [{ type: mongoose_1.SchemaTypes.ObjectId, ref: "Quiz" }],
    blogs: [{ type: mongoose_1.SchemaTypes.ObjectId, ref: "Blogs" }]
});
const createTeacherModel = (connection) => connection.model('Teacher', TeacherSchema, 'Teachers');
exports.createTeacherModel = createTeacherModel;
//# sourceMappingURL=teacher.model.js.map