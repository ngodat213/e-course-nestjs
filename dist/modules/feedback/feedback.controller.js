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
exports.FeedbackController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const feedback_service_1 = require("./feedback.service");
const rxjs_1 = require("rxjs");
const parse_object_id_pipe_1 = require("../../shared/pipe/parse.object.id.pipe");
const feedback_dto_1 = require("./feedback.dto");
let FeedbackController = class FeedbackController {
    constructor(feedbackService) {
        this.feedbackService = feedbackService;
    }
    getAllExams(keywordUser, keywordCourse, limit, skip) {
        return this.feedbackService.findAll(keywordUser, keywordCourse, skip, limit);
    }
    getExamById(id) {
        return this.feedbackService.findById(id);
    }
    createExam(exam) {
        return this.feedbackService.save(exam);
    }
    updateExam(id, exam, res) {
        return this.feedbackService.updateById(id, exam);
    }
    deleteFeedbackById(id, res) {
        return this.feedbackService.deleteById(id).pipe((0, rxjs_1.map)((feedback) => {
            return res.status(204).send();
        }));
    }
};
exports.FeedbackController = FeedbackController;
__decorate([
    (0, common_1.Get)(''),
    (0, swagger_1.ApiQuery)({ name: 'qUser', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'qCourse', required: false }),
    __param(0, (0, common_1.Query)('qUser')),
    __param(1, (0, common_1.Query)('qCourse')),
    __param(2, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __param(3, (0, common_1.Query)('skip', new common_1.DefaultValuePipe(0), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, Number]),
    __metadata("design:returntype", Promise)
], FeedbackController.prototype, "getAllExams", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FeedbackController.prototype, "getExamById", null);
__decorate([
    (0, common_1.Post)(''),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [feedback_dto_1.CreateFeedbackDTO]),
    __metadata("design:returntype", void 0)
], FeedbackController.prototype, "createExam", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, feedback_dto_1.UpdateFeedbackDTO, Object]),
    __metadata("design:returntype", Promise)
], FeedbackController.prototype, "updateExam", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], FeedbackController.prototype, "deleteFeedbackById", null);
exports.FeedbackController = FeedbackController = __decorate([
    (0, swagger_1.ApiTags)('Feedback'),
    (0, common_1.Controller)({ path: 'feedbacks', scope: common_1.Scope.REQUEST }),
    __metadata("design:paramtypes", [feedback_service_1.FeedbackService])
], FeedbackController);
//# sourceMappingURL=feedback.controller.js.map