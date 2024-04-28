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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const parse_object_id_pipe_1 = require("../../shared/pipe/parse.object.id.pipe");
const rxjs_1 = require("rxjs");
const user_dto_1 = require("./user.dto");
const local_auth_guard_1 = require("../../auth/guard/local-auth.guard");
const admin_only_guard_1 = require("../../auth/guard/admin.only.guard");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    getUser(id, withCourses, withExams, withBlogs, withQAs, withFvCourses, withFvExams, withFvTeacher, withFvQAs) {
        return this
            .userService
            .findById(id, withCourses, withExams, withBlogs, withQAs, withFvCourses, withFvExams, withFvTeacher, withFvQAs);
    }
    GetAllUsers(keyword, limit, skip) {
        return this.userService.findAll(keyword, skip, limit);
    }
    Login(req, res) {
        return this.userService.login(req.user).pipe((0, rxjs_1.map)(token => {
            return res
                .header('Authorization', 'Bearer ' + token.access_token)
                .json(token)
                .send();
        }));
    }
    Register(registerDto, res) {
        const email = registerDto.email;
        return this.userService.exitsByEmail(email).pipe((0, rxjs_1.mergeMap)(exits => {
            if (exits) {
                throw new common_1.ConflictException(`email: ${email} is existed`);
            }
            else {
                return this.userService.register(registerDto).pipe((0, rxjs_1.map)(user => res.location('/users/' + user.id)
                    .status(201)
                    .send()));
            }
        }));
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(admin_only_guard_1.AdminOnlyGuard),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Query)('withCourses', new common_1.DefaultValuePipe(false))),
    __param(2, (0, common_1.Query)('withExams', new common_1.DefaultValuePipe(false))),
    __param(3, (0, common_1.Query)('withBlogs', new common_1.DefaultValuePipe(false))),
    __param(4, (0, common_1.Query)('withQAs', new common_1.DefaultValuePipe(false))),
    __param(5, (0, common_1.Query)('withFvCourses', new common_1.DefaultValuePipe(false))),
    __param(6, (0, common_1.Query)('withFvExams', new common_1.DefaultValuePipe(false))),
    __param(7, (0, common_1.Query)('withFvTeacher', new common_1.DefaultValuePipe(false))),
    __param(8, (0, common_1.Query)('withFvQAs', new common_1.DefaultValuePipe(false))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean, Boolean, Boolean, Boolean, Boolean, Boolean, Boolean, Boolean]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserController.prototype, "getUser", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(admin_only_guard_1.AdminOnlyGuard),
    __param(0, (0, common_1.Query)('q')),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('skip', new common_1.DefaultValuePipe(0), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserController.prototype, "GetAllUsers", null);
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserController.prototype, "Login", null);
__decorate([
    (0, common_1.Post)('/register'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.RegisterDto, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserController.prototype, "Register", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)({ path: "/users" }),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map