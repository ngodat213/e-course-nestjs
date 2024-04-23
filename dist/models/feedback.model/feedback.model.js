"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFeedbackModel = void 0;
const mongoose_1 = require("mongoose");
const FeedbackSchema = new mongoose_1.Schema({
    _id: mongoose_1.SchemaTypes.ObjectId,
    userId: { type: mongoose_1.SchemaTypes.ObjectId, ref: "User", required: true },
    time: { type: mongoose_1.SchemaTypes.Date, required: true },
    rating: { type: mongoose_1.SchemaTypes.Number, required: true },
});
const createFeedbackModel = (connection) => connection.model('Feedback', FeedbackSchema, 'Feedbacks');
exports.createFeedbackModel = createFeedbackModel;
//# sourceMappingURL=feedback.model.js.map