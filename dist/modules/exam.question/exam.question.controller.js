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
exports.ExamQuestionController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const exam_question_service_1 = require("./exam.question.service");
const rxjs_1 = require("rxjs");
const parse_object_id_pipe_1 = require("../../shared/pipe/parse.object.id.pipe");
const exam_question_dto_1 = require("./exam.question.dto");
let ExamQuestionController = class ExamQuestionController {
    constructor(questionService) {
        this.questionService = questionService;
    }
    getAllQuestions(keyword, limit, skip) {
        return this.questionService.findAll(keyword, limit, skip);
    }
    getQuestionById(id) {
        return this.questionService.findById(id);
    }
    createQuestion(video, res) {
        return this.questionService.save(video).pipe((0, rxjs_1.map)((video) => {
            return res
                .location('/videos' + video._id)
                .status(201)
                .send();
        }));
    }
    updateQuestion(id, video, res) {
        return this.questionService.update(id, video).pipe((0, rxjs_1.map)((video) => {
            return res.status(204).send();
        }));
    }
    deleteQuestionById(id, res) {
        return this.questionService.deleteById(id).pipe((0, rxjs_1.map)((video) => {
            return res.status(204).send();
        }));
    }
};
exports.ExamQuestionController = ExamQuestionController;
__decorate([
    (0, common_1.Get)(''),
    __param(0, (0, common_1.Query)('q')),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('skip', new common_1.DefaultValuePipe(0), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", rxjs_1.Observable)
], ExamQuestionController.prototype, "getAllQuestions", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", rxjs_1.Observable)
], ExamQuestionController.prototype, "getQuestionById", null);
__decorate([
    (0, common_1.Post)(''),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [exam_question_dto_1.CreateExamQuestionDTO, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], ExamQuestionController.prototype, "createQuestion", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, exam_question_dto_1.UpdateExamQuestionDTO, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], ExamQuestionController.prototype, "updateQuestion", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], ExamQuestionController.prototype, "deleteQuestionById", null);
exports.ExamQuestionController = ExamQuestionController = __decorate([
    (0, swagger_1.ApiTags)('Exam question'),
    (0, common_1.Controller)({ path: 'exam/questions', scope: common_1.Scope.REQUEST }),
    __metadata("design:paramtypes", [exam_question_service_1.ExamQuestionService])
], ExamQuestionController);
//# sourceMappingURL=exam.question.controller.js.map