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
    getAllFeedbacks(keyword, limit, skip) {
        return this.feedbackService.findAll(keyword, limit, skip);
    }
    getFeedbackById(id) {
        return this.feedbackService.findById(id);
    }
    createFeedback(feedback, res) {
        return this.feedbackService.save(feedback).pipe((0, rxjs_1.map)((feedback) => {
            return res
                .location('/feedbacks/' + feedback._id)
                .status(201)
                .send();
        }));
    }
    updateFeedback(id, ceedback, res) {
        return this.feedbackService.update(id, ceedback).pipe((0, rxjs_1.map)((feedback) => {
            return res.status(204).send();
        }));
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
    __param(0, (0, common_1.Query)('q')),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('skip', new common_1.DefaultValuePipe(0), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", rxjs_1.Observable)
], FeedbackController.prototype, "getAllFeedbacks", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", rxjs_1.Observable)
], FeedbackController.prototype, "getFeedbackById", null);
__decorate([
    (0, common_1.Post)(''),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [feedback_dto_1.CreateFeedbackDTO, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], FeedbackController.prototype, "createFeedback", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, feedback_dto_1.UpdateFeedbackDTO, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], FeedbackController.prototype, "updateFeedback", null);
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