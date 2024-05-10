"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const user_controller_1 = require("./user.controller");
const user_service_1 = require("./user.service");
const database_module_1 = require("../../database/database.module");
const jwt_strategy_1 = require("../../auth/strategy/jwt.strategy");
const config_1 = require("@nestjs/config");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const jwt_config_1 = require("../../configs/jwt.config");
const local_strategy_1 = require("../../auth/strategy/local.strategy");
const cloudinary_service_1 = require("../../cloudinary/cloudinary.service");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DatabaseModule,
            config_1.ConfigModule.forFeature(jwt_config_1.default),
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.register({
                global: true,
                secret: "hydracoder1993744",
                signOptions: {
                    expiresIn: "7d"
                }
            })
        ],
        controllers: [user_controller_1.UserController],
        exports: [user_service_1.UserService, passport_1.PassportModule],
        providers: [user_service_1.UserService, local_strategy_1.LocalStrategy, jwt_strategy_1.JwtStrategy, cloudinary_service_1.CloudinaryService]
    })
], UserModule);
//# sourceMappingURL=user.module.js.map