"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamHistoryController = void 0;
const common_1 = require("@nestjs/common");
const parse_object_id_pipe_1 = require("../../shared/pipe/parse.object.id.pipe");
const swagger_1 = require("@nestjs/swagger");
const exam_history_service_1 = require("./exam.history.service");
const exam_history_dto_1 = require("./exam.history.dto");
const responser_decorator_1 = require("../../decorators/responser.decorator");
let ExamHistoryController = class ExamHistoryController {
    constructor(historyService) {
        this.historyService = historyService;
    }
    getAllExamHistorys(keywordUser, keywordExam, limit, skip) {
        return this.historyService.findAll(keywordUser, keywordExam, skip, limit);
    }
    getExamHistoryById(id) {
        return this.historyService.findById(id);
    }
    createExamHistory(courseOrder) {
        return this.historyService.save(courseOrder);
    }
    updateExamHistory(id, courseOrder, res) {
        return this.historyService.updateById(id, courseOrder);
    }
    deleteExamHistoryById(id, res) {
        return this.historyService.deleteById(id);
    }
};
exports.ExamHistoryController = ExamHistoryController;
__decorate([
    (0, common_1.Get)(''),
    (0, swagger_1.ApiQuery)({ name: 'qUser', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'qExam', required: false }),
    __param(0, (0, common_1.Query)('qUser')),
    __param(1, (0, common_1.Query)('qExam')),
    __param(2, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __param(3, (0, common_1.Query)('skip', new common_1.DefaultValuePipe(0), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, Number]),
    __metadata("design:returntype", Promise)
], ExamHistoryController.prototype, "getAllExamHistorys", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExamHistoryController.prototype, "getExamHistoryById", null);
__decorate([
    (0, common_1.Post)(''),
    responser_decorator_1.Responser.handle('Create course order'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [exam_history_dto_1.CreateExamHistoryDTO]),
    __metadata("design:returntype", void 0)
], ExamHistoryController.prototype, "createExamHistory", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, exam_history_dto_1.UpdateExamHistoryDTO, Object]),
    __metadata("design:returntype", Promise)
], ExamHistoryController.prototype, "updateExamHistory", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ExamHistoryController.prototype, "deleteExamHistoryById", null);
exports.ExamHistoryController = ExamHistoryController = __decorate([
    (0, swagger_1.ApiTags)('Exam History'),
    (0, common_1.Controller)({ path: 'history', scope: common_1.Scope.REQUEST }),
    __metadata("design:paramtypes", [exam_history_service_1.ExamHistoryService])
], ExamHistoryController);
//# sourceMappingURL=exam.history.controller.js.map