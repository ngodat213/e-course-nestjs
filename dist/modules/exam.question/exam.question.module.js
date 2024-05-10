"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamQuestionModule = void 0;
const common_1 = require("@nestjs/common");
const exam_question_controller_1 = require("./exam.question.controller");
const exam_question_service_1 = require("./exam.question.service");
const database_module_1 = require("../../processors/database/database.module");
const user_service_1 = require("../user/user.service");
let ExamQuestionModule = class ExamQuestionModule {
};
exports.ExamQuestionModule = ExamQuestionModule;
exports.ExamQuestionModule = ExamQuestionModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [exam_question_controller_1.ExamQuestionController],
        providers: [exam_question_service_1.ExamQuestionService, user_service_1.UserService]
    })
], ExamQuestionModule);
//# sourceMappingURL=exam.question.module.js.map