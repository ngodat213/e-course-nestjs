"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamHistoryModule = void 0;
const common_1 = require("@nestjs/common");
const exam_history_controller_1 = require("./exam.history.controller");
const exam_history_service_1 = require("./exam.history.service");
const database_module_1 = require("../../database/database.module");
const user_service_1 = require("../user/user.service");
let ExamHistoryModule = class ExamHistoryModule {
};
exports.ExamHistoryModule = ExamHistoryModule;
exports.ExamHistoryModule = ExamHistoryModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [exam_history_controller_1.ExamHistoryController],
        providers: [exam_history_service_1.ExamHistoryService, user_service_1.UserService]
    })
], ExamHistoryModule);
//# sourceMappingURL=exam.history.module.js.map