"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTeacherModel = void 0;
const mongoose_1 = require("mongoose");
const TeacherSchema = new mongoose_1.Schema({
    _id: mongoose_1.SchemaTypes.ObjectId,
    description: { type: mongoose_1.SchemaTypes.String, required: true },
    courses: [{ type: mongoose_1.SchemaTypes.ObjectId, ref: "Course" }],
    exams: [{ type: mongoose_1.SchemaTypes.ObjectId, ref: "Exam" }],
    blogs: [{ type: mongoose_1.SchemaTypes.ObjectId, ref: "Blog" }]
});
const createTeacherModel = (connection) => connection.model('Teacher', TeacherSchema, 'Teachers');
exports.createTeacherModel = createTeacherModel;
//# sourceMappingURL=teacher.model.js.map