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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const database_constants_1 = require("../../database/database.constants");
const role_type_enum_1 = require("../../shared/enum/role.type.enum");
const jwt_1 = require("@nestjs/jwt");
const checkPermission_helper_1 = require("../../helper/checkPermission.helper");
let UserService = class UserService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    findByEmail(email) {
        return (0, rxjs_1.from)(this.userModel.findOne({ email: email }).exec());
    }
    findOneByEmail(email) {
        return this.userModel.findOne({ email });
    }
    exitsByEmail(email) {
        return (0, rxjs_1.from)(this.userModel.exists({ email }).exec()).pipe((0, rxjs_1.map)((exits) => exits != null));
    }
    register(data) {
        const created = this.userModel.create({
            ...data,
            roles: [role_type_enum_1.RoleType.USER],
        });
        return (0, rxjs_1.from)(created);
    }
    validateUser(email, pass) {
        return this.findByEmail(email).pipe((0, rxjs_1.mergeMap)((p) => (p ? (0, rxjs_1.of)(p) : rxjs_1.EMPTY)), (0, rxjs_1.throwIfEmpty)(() => new common_1.UnauthorizedException(`email: ${email} was not found`)), (0, rxjs_1.mergeMap)((user) => {
            const { _id, password, username, email, roles } = user;
            return user.comparePassword(pass).pipe((0, rxjs_1.map)(m => {
                if (m) {
                    return { id: _id, username, email, roles };
                }
                else {
                    throw new common_1.UnauthorizedException('username or password is not matched');
                }
            }));
        }));
    }
    login(user) {
        const payload = {
            id: user.id,
            username: user.username,
            email: user.email,
            photoUrl: user.photoUrl,
            roles: user.roles,
        };
        return (0, rxjs_1.from)(this.jwtService.signAsync(payload)).pipe((0, rxjs_1.map)((access_token) => {
            return { access_token };
        }));
    }
    findAll(keyword, skip = 0, limit = 10) {
        if (keyword && keyword.trim() === '') {
            throw new common_1.BadRequestException('Do not enter spaces.');
        }
        if (keyword) {
            return (0, rxjs_1.from)(this.userModel
                .find({ username: { $regex: keyword, $options: 'i' } })
                .select('-password')
                .skip(skip)
                .limit(limit)
                .exec());
        }
        else {
            return (0, rxjs_1.from)(this.userModel.find({}).select('-password -__v').skip(skip).limit(limit).exec());
        }
    }
    findById(id, withCourses = false, withExams = false, withBlogs = false, withQAs = false, withFvCourses = false, withFvExams = false, withFvTeacher = false, withFvQAs = false) {
        const userQuery = this.userModel.findOne({ _id: id }).select('-password');
        if (withCourses)
            userQuery.populate('courses');
        if (withExams)
            userQuery.populate('finishedExams');
        if (withBlogs)
            userQuery.populate('blogs');
        if (withQAs)
            userQuery.populate('qAs');
        if (withFvCourses)
            userQuery.populate('favouritesCourses');
        if (withFvExams)
            userQuery.populate('favouritesExams');
        if (withFvQAs)
            userQuery.populate('favouritesQAs');
        return (0, rxjs_1.from)(userQuery.exec()).pipe((0, rxjs_1.mergeMap)((p) => (p ? (0, rxjs_1.of)(p) : rxjs_1.EMPTY)), (0, rxjs_1.throwIfEmpty)(() => new common_1.NotFoundException(`user: $id was not found`)));
    }
    async updateById(id, requestBody, currentUser) {
        let user = await this.userModel.findById(id);
        if (!user) {
            throw new common_1.NotFoundException('User does not exist');
        }
        if (user.email != requestBody.email && requestBody.email != null) {
            const userByEmail = this.findByEmail(requestBody.email);
            if (userByEmail) {
                throw new common_1.BadRequestException('Email already exist');
            }
        }
        checkPermission_helper_1.Permission.check(id, currentUser);
        user.set(requestBody);
        const updatedUser = await this.userModel.findByIdAndUpdate(id, user);
        return {
            username: updatedUser.username,
            photoUrl: updatedUser.photoUrl,
            email: updatedUser.email,
        };
    }
    lock(id) {
        return (0, rxjs_1.from)(this.userModel.findById(id));
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(database_constants_1.USER_MODEL)),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService])
], UserService);
//# sourceMappingURL=user.service.js.map