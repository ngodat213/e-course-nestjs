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
exports.CourseOrderController = void 0;
const common_1 = require("@nestjs/common");
const course_order_service_1 = require("./course.order.service");
const parse_object_id_pipe_1 = require("../../shared/pipe/parse.object.id.pipe");
const course_order_dto_1 = require("./course.order.dto");
const swagger_1 = require("@nestjs/swagger");
const roles_guard_1 = require("../../auth/guard/roles.guard");
const auth_guard_1 = require("../../auth/guard/auth.guard");
const has_roles_decorator_1 = require("../../auth/guard/has-roles.decorator");
const role_type_enum_1 = require("../../shared/enum/role.type.enum");
let CourseOrderController = class CourseOrderController {
    constructor(orderService) {
        this.orderService = orderService;
    }
    getAllCourseOrders(keywordUser, keywordCourse, limit, skip) {
        return this.orderService.findAll(keywordUser, keywordCourse, skip, limit);
    }
    getCourseOrderById(id) {
        return this.orderService.findById(id);
    }
    createCourseOrder(courseOrder) {
        return this.orderService.save(courseOrder);
    }
    updateCourseOrder(id, courseOrder) {
        return this.orderService.updateById(id, courseOrder);
    }
    deleteCourseOrderById(id) {
        return this.orderService.deleteById(id);
    }
};
exports.CourseOrderController = CourseOrderController;
__decorate([
    (0, common_1.Get)(''),
    (0, swagger_1.ApiQuery)({ name: 'qUser', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'qCourse', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'skip', required: false }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, has_roles_decorator_1.HasRoles)(role_type_enum_1.RoleType.ADMIN, role_type_enum_1.RoleType.TEACHER),
    __param(0, (0, common_1.Query)('qUser')),
    __param(1, (0, common_1.Query)('qCourse')),
    __param(2, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __param(3, (0, common_1.Query)('skip', new common_1.DefaultValuePipe(0), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, Number]),
    __metadata("design:returntype", Promise)
], CourseOrderController.prototype, "getAllCourseOrders", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, has_roles_decorator_1.HasRoles)(role_type_enum_1.RoleType.ADMIN, role_type_enum_1.RoleType.TEACHER),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CourseOrderController.prototype, "getCourseOrderById", null);
__decorate([
    (0, common_1.Post)(''),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [course_order_dto_1.CreateCourseOrderDTO]),
    __metadata("design:returntype", void 0)
], CourseOrderController.prototype, "createCourseOrder", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, has_roles_decorator_1.HasRoles)(role_type_enum_1.RoleType.ADMIN, role_type_enum_1.RoleType.TEACHER),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, course_order_dto_1.UpdateCourseOrderDTO]),
    __metadata("design:returntype", void 0)
], CourseOrderController.prototype, "updateCourseOrder", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, has_roles_decorator_1.HasRoles)(role_type_enum_1.RoleType.ADMIN, role_type_enum_1.RoleType.TEACHER),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CourseOrderController.prototype, "deleteCourseOrderById", null);
exports.CourseOrderController = CourseOrderController = __decorate([
    (0, swagger_1.ApiTags)('Course order'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)({ path: 'order', scope: common_1.Scope.REQUEST }),
    __metadata("design:paramtypes", [course_order_service_1.CourseOrderService])
], CourseOrderController);
//# sourceMappingURL=course.order.controller.js.map