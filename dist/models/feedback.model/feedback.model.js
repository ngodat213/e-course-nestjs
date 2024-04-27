"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFeedbackModel = void 0;
const mongoose_1 = require("mongoose");
const FeedbackSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.SchemaTypes.ObjectId, ref: 'User', required: true },
    course: { type: mongoose_1.SchemaTypes.ObjectId, ref: 'Course', required: true },
    title: { type: mongoose_1.SchemaTypes.String, required: true },
    rating: { type: mongoose_1.SchemaTypes.Number, required: true },
}, { timestamps: true });
const createFeedbackModel = (connection) => connection.model('Feedback', FeedbackSchema, 'Feedbacks');
exports.createFeedbackModel = createFeedbackModel;
//# sourceMappingURL=feedback.model.js.map