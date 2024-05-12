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
const database_constants_1 = require("../../processors/database/database.constants");
const role_type_enum_1 = require("../../shared/enum/role.type.enum");
const checkPermission_helper_1 = require("../../helper/checkPermission.helper");
const jwt_1 = require("@nestjs/jwt");
const cloudinary_constants_1 = require("../../constants/cloudinary.constants");
const helper_service_clouldinary_1 = require("../../processors/helper/helper.service.clouldinary");
const helper_service_email_1 = require("../../processors/helper/helper.service.email");
const bcrypt_1 = require("bcrypt");
const APP_CONFIG = require("../../app.config");
let UserService = class UserService {
    constructor(userModel, forgotPwModel, jwtService, cloudinaryService, emailService) {
        this.userModel = userModel;
        this.forgotPwModel = forgotPwModel;
        this.jwtService = jwtService;
        this.cloudinaryService = cloudinaryService;
        this.emailService = emailService;
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
    validateUser(email, pass) {
        return this.findByEmail(email).pipe((0, rxjs_1.mergeMap)((p) => (p ? (0, rxjs_1.of)(p) : rxjs_1.EMPTY)), (0, rxjs_1.throwIfEmpty)(() => new common_1.UnauthorizedException(`email: ${email} was not found`)), (0, rxjs_1.mergeMap)((user) => {
            const { _id, password, username, email, roles } = user;
            return user.comparePassword(pass).pipe((0, rxjs_1.map)(m => {
                if (m) {
                    return { id: _id, username, email, roles };
                }
                else {
                    throw new common_1.UnauthorizedException('email or password is not matched');
                }
            }));
        }));
    }
    passwordTokenRandom() {
        return (Math.floor(Math.random() * 9000000) + 1000000).toString();
    }
    async sendEmailForgotPassword(email) {
        try {
            var user = await this.userModel.findOne({ email: email });
            if (!user) {
                throw new common_1.HttpException(`Forgot password: user not found`, common_1.HttpStatus.NOT_FOUND);
            }
            var tokenModel = await this.createForgotPasswordToken(email);
            if (tokenModel && tokenModel.newPasswordToken) {
                const content = `
        <p>Hello,</p>
        <p>We received a request to reset your password. Please use the following token to reset your password:</p>
        <p><strong>${tokenModel.newPasswordToken}</strong></p>
        <p>If you didn't request this, you can safely ignore this email.</p>
        <p>Thank you,</p>
        <p>Company Team</p>
        `;
                this.emailService.sendMailAs(APP_CONFIG.APP.NAME, {
                    to: email,
                    subject: "Forgotten Password",
                    text: "hehe",
                    html: content,
                });
                return true;
            }
        }
        catch (err) {
            console.log(err);
            throw new common_1.BadRequestException(`${err.message}`);
        }
    }
    async createForgotPasswordToken(email) {
        var forgottenPassword = await this.forgotPwModel.findOne({ email: email });
        if (forgottenPassword && (new Date().getTime() - forgottenPassword.timestamp.getTime()) / 60000 < 15) {
            throw new common_1.HttpException("RESET.PASSWORD.EMAIL_SENDED_RECENTLY", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        else {
            var forgottenPasswordModel = await this.forgotPwModel.findOneAndUpdate({ email: email }, { email: email,
                newPasswordToken: this.passwordTokenRandom(),
                timestamp: new Date(),
            }, {
                upsert: true,
                new: true,
            });
            return forgottenPasswordModel;
        }
    }
    async changedPassword(body) {
        try {
            if (body.newPassword.length < 8) {
                throw new common_1.BadRequestException(`The min length of password is 8`);
            }
            if (body.newPasswordToken) {
                var forgottenPassworldModel = await this.getForgottenPasswordModel(body.email, body.newPasswordToken);
                if (!forgottenPassworldModel) {
                    throw new common_1.BadRequestException(`Password token or email is wrong`);
                }
                const findOneUser = await this.userModel.findOne({ email: body.email });
                const hashedPassword = await (0, bcrypt_1.hash)(body.newPassword, 12);
                findOneUser.set('password', hashedPassword);
                await this.userModel.findByIdAndUpdate(findOneUser.id, findOneUser);
                await forgottenPassworldModel.deleteOne();
                return true;
            }
        }
        catch (err) {
            console.log(err);
            throw new common_1.BadRequestException(`${err.message}`);
        }
    }
    async getForgottenPasswordModel(email, newPasswordToken) {
        return await this.forgotPwModel.findOne({ email: email, newPasswordToken: newPasswordToken });
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
    async changedAvatar(id, requestBody, currentUser) {
        const fileImage = requestBody.file;
        let user = await this.userModel.findById(id);
        if (!user) {
            throw new common_1.NotFoundException('User does not exist');
        }
        checkPermission_helper_1.Permission.check(id, currentUser);
        try {
            if (user.photoPublicId) {
                this.cloudinaryService.destroyFile(user.photoPublicId);
            }
            const imageUpload = await this.cloudinaryService.uploadFile(fileImage, cloudinary_constants_1.USER_AVATAR, id, cloudinary_constants_1.RESOURCE_TYPE_IMAGE);
            user.photoPublicId = imageUpload.public_id;
            user.photoUrl = imageUpload.url;
            await this.userModel.findByIdAndUpdate(id, user);
            const getUser = await this.userModel.findById(id);
            return {
                username: getUser.username,
                photoUrl: getUser.photoUrl,
                email: getUser.email,
            };
        }
        catch (err) {
            console.log(`Faill error: ${err}`);
            throw new common_1.BadRequestException(`Failed to upload image: ${err}`);
        }
    }
    async updateById(id, requestBody, currentUser) {
        if (requestBody.roles) {
            throw new common_1.BadRequestException('You cannot change role');
        }
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
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(database_constants_1.USER_MODEL)),
    __param(1, (0, common_1.Inject)(database_constants_1.FORGOT_PASSWORD_MODEL)),
    __metadata("design:paramtypes", [Object, Object, jwt_1.JwtService,
        helper_service_clouldinary_1.CloudinaryService,
        helper_service_email_1.EmailService])
], UserService);
//# sourceMappingURL=user.service.js.map