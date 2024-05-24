"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCourseOrderModel = void 0;
const mongoose_1 = require("mongoose");
const CourseOrderSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.SchemaTypes.ObjectId, ref: 'User' },
    course: { type: mongoose_1.SchemaTypes.ObjectId, ref: 'Course' },
    totalPrice: { type: mongoose_1.SchemaTypes.Number, required: true },
    payment: { type: mongoose_1.SchemaTypes.String, required: true },
    paymentStatus: { type: mongoose_1.SchemaTypes.String, required: true },
    deleteAt: { type: mongoose_1.SchemaTypes.Date, default: null },
}, { timestamps: true });
const createCourseOrderModel = (connection) => connection.model('CourseOrder', CourseOrderSchema, 'CourseOrders');
exports.createCourseOrderModel = createCourseOrderModel;
//# sourceMappingURL=course.order.model.js.map