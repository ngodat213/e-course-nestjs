"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserModel = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    _id: mongoose_1.SchemaTypes.ObjectId,
    email: { type: mongoose_1.SchemaTypes.String, unique: true, required: true, match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ },
    password: { type: mongoose_1.SchemaTypes.String, required: true },
    username: { type: mongoose_1.SchemaTypes.String, required: true },
    photoUrl: { type: mongoose_1.SchemaTypes.String, default: "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg" },
    blogs: { type: [{ type: mongoose_1.SchemaTypes.ObjectId, ref: 'Blog' }] },
    qAs: { type: [{ type: mongoose_1.SchemaTypes.ObjectId, ref: 'Blog' }] },
    courses: { type: [{ type: mongoose_1.SchemaTypes.ObjectId, ref: 'Course' }] },
    favouritesCourses: { type: [{ type: mongoose_1.SchemaTypes.ObjectId, ref: 'Course' }] },
    favouritesQuizs: { type: [{ type: mongoose_1.SchemaTypes.ObjectId, ref: 'Exam' }] },
    finishedQuizs: { type: [{ type: mongoose_1.SchemaTypes.ObjectId, ref: 'Exam' }] },
    favouritesTeachers: { type: [{ type: mongoose_1.SchemaTypes.ObjectId, ref: 'Teacher' }] },
    favouritesBlogs: { type: [{ type: mongoose_1.SchemaTypes.ObjectId, ref: 'Blog' }] },
    favouritesQAs: { type: [{ type: mongoose_1.SchemaTypes.ObjectId, ref: 'Blog' }] },
    created: { type: mongoose_1.SchemaTypes.Date },
    signedIn: { type: mongoose_1.SchemaTypes.Date },
});
const createUserModel = (connection) => connection.model('User', UserSchema, 'Users');
exports.createUserModel = createUserModel;
//# sourceMappingURL=user.model.js.map