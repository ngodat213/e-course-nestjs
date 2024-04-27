"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBlogModel = void 0;
const mongoose_1 = require("mongoose");
const BlogSchema = new mongoose_1.Schema({});
const createBlogModel = (connection) => connection.model('Blog', BlogSchema, 'Blogs');
exports.createBlogModel = createBlogModel;
//# sourceMappingURL=blog.model.js.map