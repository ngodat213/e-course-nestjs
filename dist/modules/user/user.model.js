"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePasswordMethod = exports.preSaveHook = exports.UserSchema = exports.createUserModel = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = require("bcrypt");
const rxjs_1 = require("rxjs");
const UserSchema = new mongoose_1.Schema({
    email: { type: mongoose_1.SchemaTypes.String, unique: true, required: true, match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ },
    password: { type: mongoose_1.SchemaTypes.String, required: true },
    username: { type: mongoose_1.SchemaTypes.String, required: true },
    photoUrl: { type: mongoose_1.SchemaTypes.String, default: "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg" },
    photoPublicId: { type: mongoose_1.SchemaTypes.String, default: null },
    roles: [{ type: mongoose_1.SchemaTypes.String, enum: ['ADMIN', 'TEACHER', 'USER'], required: false },],
    courses: { type: [{ type: mongoose_1.SchemaTypes.ObjectId, ref: 'Course' }] },
    favouritesCourses: { type: [{ type: mongoose_1.SchemaTypes.ObjectId, ref: 'Course' }] },
    favouritesExams: { type: [{ type: mongoose_1.SchemaTypes.ObjectId, ref: 'Exam' }] },
    finishedExams: { type: [{ type: mongoose_1.SchemaTypes.ObjectId, ref: 'Exam' }] },
}, { timestamps: true });
exports.UserSchema = UserSchema;
async function preSaveHook(next) {
    if (!this.isModified('password'))
        return next();
    const password = await (0, bcrypt_1.hash)(this.password, 12);
    this.set('password', password);
    next();
}
exports.preSaveHook = preSaveHook;
UserSchema.pre('save', preSaveHook);
function comparePasswordMethod(password) {
    return (0, rxjs_1.from)((0, bcrypt_1.compare)(password, this.password));
}
exports.comparePasswordMethod = comparePasswordMethod;
UserSchema.methods.comparePassword = comparePasswordMethod;
const createUserModel = (connection) => connection.model('User', UserSchema, 'Users');
exports.createUserModel = createUserModel;
//# sourceMappingURL=user.model.js.map