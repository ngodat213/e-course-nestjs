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
const rxjs_1 = require("rxjs");
const parse_object_id_pipe_1 = require("../../shared/pipe/parse.object.id.pipe");
const course_order_dto_1 = require("./course.order.dto");
const swagger_1 = require("@nestjs/swagger");
let CourseOrderController = class CourseOrderController {
    constructor(orderService) {
        this.orderService = orderService;
    }
    getAllCourseOrders(keyword, limit, skip) {
        return this.orderService.findAll(keyword, skip, limit);
    }
    getCourseOrderById(id) {
        return this.orderService.findById(id);
    }
    createCourseOrder(courseOrder, res) {
        return this.orderService.save(courseOrder).pipe((0, rxjs_1.map)((feedback) => {
            return res
                .location('/courseOrders/' + feedback._id)
                .status(201)
                .send();
        }));
    }
    updateCourseOrder(id, courseOrder, res) {
        return this.orderService.update(id, courseOrder).pipe((0, rxjs_1.map)((courseOrder) => {
            return res.status(204).send();
        }));
    }
    deleteCourseOrderById(id, res) {
        return this.orderService.deleteById(id).pipe((0, rxjs_1.map)((courseOrder) => {
            return res.status(204).send();
        }));
    }
};
exports.CourseOrderController = CourseOrderController;
__decorate([
    (0, common_1.Get)(''),
    __param(0, (0, common_1.Query)('q')),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('skip', new common_1.DefaultValuePipe(0), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", rxjs_1.Observable)
], CourseOrderController.prototype, "getAllCourseOrders", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", rxjs_1.Observable)
], CourseOrderController.prototype, "getCourseOrderById", null);
__decorate([
    (0, common_1.Post)(''),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [course_order_dto_1.CreateCourseOrderDTO, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], CourseOrderController.prototype, "createCourseOrder", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, course_order_dto_1.UpdateCourseOrderDTO, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], CourseOrderController.prototype, "updateCourseOrder", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], CourseOrderController.prototype, "deleteCourseOrderById", null);
exports.CourseOrderController = CourseOrderController = __decorate([
    (0, swagger_1.ApiTags)('Course order'),
    (0, common_1.Controller)('order'),
    __metadata("design:paramtypes", [course_order_service_1.CourseOrderService])
], CourseOrderController);
//# sourceMappingURL=course.order.controller.js.map