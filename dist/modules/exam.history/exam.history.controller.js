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
const rxjs_1 = require("rxjs");
const parse_object_id_pipe_1 = require("../../shared/pipe/parse.object.id.pipe");
const swagger_1 = require("@nestjs/swagger");
const exam_history_service_1 = require("./exam.history.service");
const exam_history_dto_1 = require("./exam.history.dto");
let ExamHistoryController = class ExamHistoryController {
    constructor(historyService) {
        this.historyService = historyService;
    }
    getAllExamHistorys(keyword, limit, skip) {
        return this.historyService.findAll(keyword, skip, limit);
    }
    getExamHistoryById(id) {
        return this.historyService.findById(id);
    }
    createExamHistory(history, res) {
        return this.historyService.save(history).pipe((0, rxjs_1.map)((history) => {
            return res
                .location('/examhistory/' + history._id)
                .status(201)
                .send();
        }));
    }
    updateExamHistory(id, history, res) {
        return this.historyService.update(id, history).pipe((0, rxjs_1.map)((history) => {
            return res.status(204).send();
        }));
    }
    deleteExamHistoryById(id, res) {
        return this.historyService.deleteById(id).pipe((0, rxjs_1.map)((history) => {
            return res.status(204).send();
        }));
    }
};
exports.ExamHistoryController = ExamHistoryController;
__decorate([
    (0, common_1.Get)(''),
    __param(0, (0, common_1.Query)('q')),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('skip', new common_1.DefaultValuePipe(0), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", rxjs_1.Observable)
], ExamHistoryController.prototype, "getAllExamHistorys", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", rxjs_1.Observable)
], ExamHistoryController.prototype, "getExamHistoryById", null);
__decorate([
    (0, common_1.Post)(''),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [exam_history_dto_1.CreateExamHistoryDTO, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], ExamHistoryController.prototype, "createExamHistory", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, exam_history_dto_1.UpdateExamHistoryDTO, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], ExamHistoryController.prototype, "updateExamHistory", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], ExamHistoryController.prototype, "deleteExamHistoryById", null);
exports.ExamHistoryController = ExamHistoryController = __decorate([
    (0, swagger_1.ApiTags)('Exam History'),
    (0, common_1.Controller)({ path: 'history', scope: common_1.Scope.REQUEST }),
    __metadata("design:paramtypes", [exam_history_service_1.ExamHistoryService])
], ExamHistoryController);
//# sourceMappingURL=exam.history.controller.js.map