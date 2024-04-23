"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategoryModel = void 0;
const mongoose_1 = require("mongoose");
const CategorySchema = new mongoose_1.Schema({
    _id: mongoose_1.SchemaTypes.ObjectId,
    category: { type: mongoose_1.SchemaTypes.String, required: true },
});
const createCategoryModel = (connection) => connection.model('Category', CategorySchema, 'Categorys');
exports.createCategoryModel = createCategoryModel;
//# sourceMappingURL=category.model.js.map