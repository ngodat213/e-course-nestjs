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
exports.ExamController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const rxjs_1 = require("rxjs");
const exam_service_1 = require("./exam.service");
const parse_object_id_pipe_1 = require("../../shared/pipe/parse.object.id.pipe");
const exam_dto_1 = require("./exam.dto");
const roles_guard_1 = require("../../auth/guard/roles.guard");
const auth_guard_1 = require("../../auth/guard/auth.guard");
const role_type_enum_1 = require("../../shared/enum/role.type.enum");
const has_roles_decorator_1 = require("../../auth/guard/has-roles.decorator");
let ExamController = class ExamController {
    constructor(examService) {
        this.examService = examService;
    }
    getAllExams(keyword, limit, skip) {
        return this.examService.findAll(keyword, skip, limit);
    }
    getExamById(id) {
        return this.examService.findById(id);
    }
    createExam(exam) {
        return this.examService.save(exam);
    }
    updateExam(id, exam, res) {
        return this.examService.updateById(id, exam);
    }
    deleteExamById(id, res) {
        return this.examService.deleteById(id).pipe((0, rxjs_1.map)((exam) => {
            return res.status(204).send();
        }));
    }
    getAllLessonsOfExam(id) {
        return this.examService.lessonsOf(id);
    }
};
exports.ExamController = ExamController;
__decorate([
    (0, common_1.Get)(''),
    (0, swagger_1.ApiQuery)({ name: 'q', required: false }),
    __param(0, (0, common_1.Query)('q')),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('skip', new common_1.DefaultValuePipe(0), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], ExamController.prototype, "getAllExams", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExamController.prototype, "getExamById", null);
__decorate([
    (0, common_1.Post)(''),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, has_roles_decorator_1.HasRoles)(role_type_enum_1.RoleType.ADMIN, role_type_enum_1.RoleType.TEACHER),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [exam_dto_1.CreateExamDTO]),
    __metadata("design:returntype", void 0)
], ExamController.prototype, "createExam", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, has_roles_decorator_1.HasRoles)(role_type_enum_1.RoleType.ADMIN, role_type_enum_1.RoleType.TEACHER),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, exam_dto_1.UpdateExamDTO, Object]),
    __metadata("design:returntype", Promise)
], ExamController.prototype, "updateExam", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, has_roles_decorator_1.HasRoles)(role_type_enum_1.RoleType.ADMIN, role_type_enum_1.RoleType.TEACHER),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], ExamController.prototype, "deleteExamById", null);
__decorate([
    (0, common_1.Get)(':id/lessons'),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExamController.prototype, "getAllLessonsOfExam", null);
exports.ExamController = ExamController = __decorate([
    (0, swagger_1.ApiTags)('Exam'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)({ path: 'exams', scope: common_1.Scope.REQUEST }),
    __metadata("design:paramtypes", [exam_service_1.ExamService])
], ExamController);
//# sourceMappingURL=exam.controller.js.map