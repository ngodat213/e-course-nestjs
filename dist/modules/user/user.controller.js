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
const current_user_decorator_1 = require("../../decorators/current.user.decorator");
const swagger_1 = require("@nestjs/swagger");
const roles_guard_1 = require("../../auth/guard/roles.guard");
const auth_guard_1 = require("../../auth/guard/auth.guard");
const has_roles_decorator_1 = require("../../auth/guard/has-roles.decorator");
const role_type_enum_1 = require("../../shared/enum/role.type.enum");
const platform_express_1 = require("@nestjs/platform-express");
const api_file_decorator_1 = require("../../decorators/api.file.decorator");
const responser_decorator_1 = require("../../decorators/responser.decorator");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    GetAllUsers(keyword, limit, skip) {
        return this.userService.findAll(keyword, skip, limit);
    }
    GetCurrentUser(user) {
        return user;
    }
    Login(req, res) {
        console.log(process.env.JWT_SECRET_KEY);
        console.log(process.env.JWT_EXPIRES_IN);
        return this.userService.login(req.user).pipe((0, rxjs_1.map)(token => {
            return res
                .header('Authorization', 'Bearer ' + token.access_token)
                .json(token)
                .send();
        }));
    }
    Register(registerDto) {
        return this.userService.register(registerDto);
    }
    updateUser(id, requestBody, currentUser) {
        return this.userService.updateById(id, requestBody, currentUser);
    }
    updateAvatarUser(id, body, currentUser) {
        return this.userService.changedAvatar(id, body, currentUser);
    }
    resetPassword(email) {
        return this.userService.sendEmailForgotPassword(email);
    }
    setNewPassword(requestBody) {
        return this.userService.changedPassword(requestBody);
    }
    deleteFeedbackById(id) {
        return this.userService.lockById(id);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiQuery)({ name: 'q', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'skip', required: false }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, has_roles_decorator_1.HasRoles)(role_type_enum_1.RoleType.ADMIN),
    __param(0, (0, common_1.Query)('q')),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('skip', new common_1.DefaultValuePipe(0), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserController.prototype, "GetAllUsers", null);
__decorate([
    (0, common_1.Get)('/current'),
    responser_decorator_1.Responser.handle('Get current user'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, has_roles_decorator_1.HasRoles)(role_type_enum_1.RoleType.ADMIN, role_type_enum_1.RoleType.USER, role_type_enum_1.RoleType.TEACHER),
    __param(0, (0, current_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "GetCurrentUser", null);
__decorate([
    (0, common_1.Post)('/login'),
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, swagger_1.ApiProperty)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserController.prototype, "Login", null);
__decorate([
    (0, common_1.Post)('/register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.RegisterDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "Register", null);
__decorate([
    (0, common_1.Put)('/:id'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, has_roles_decorator_1.HasRoles)(role_type_enum_1.RoleType.ADMIN, role_type_enum_1.RoleType.USER, role_type_enum_1.RoleType.TEACHER),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UpdateUserDTO, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Put)('/avatar/:id'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, has_roles_decorator_1.HasRoles)(role_type_enum_1.RoleType.ADMIN, role_type_enum_1.RoleType.USER, role_type_enum_1.RoleType.TEACHER),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file'), api_file_decorator_1.FileToBodyInterceptor),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.ChangeAvatarDTO, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updateAvatarUser", null);
__decorate([
    (0, common_1.Post)('/forgot-password/:email'),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Post)('/reset-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.ResetPasswordDTO]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "setNewPassword", null);
__decorate([
    (0, common_1.Delete)('/lock/:id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, has_roles_decorator_1.HasRoles)(role_type_enum_1.RoleType.ADMIN),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "deleteFeedbackById", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)({ path: "/users" }),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map