"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorInterceptor = void 0;
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const common_1 = require("@nestjs/common");
const responser_decorator_1 = require("../decorators/responser.decorator");
const custom_error_1 = require("../errors/custom.error");
const TEXT = require("../constants/text.constant");
let ErrorInterceptor = class ErrorInterceptor {
    intercept(context, next) {
        const target = context.getHandler();
        const { errorCode, errorMessage } = (0, responser_decorator_1.getResponserOptions)(target);
        return next.handle().pipe((0, operators_1.catchError)((error) => {
            return (0, rxjs_1.throwError)(() => new custom_error_1.CustomError({ message: errorMessage || TEXT.HTTP_DEFAULT_ERROR_TEXT, error }, errorCode));
        }));
    }
};
exports.ErrorInterceptor = ErrorInterceptor;
exports.ErrorInterceptor = ErrorInterceptor = __decorate([
    (0, common_1.Injectable)()
], ErrorInterceptor);
//# sourceMappingURL=error.interceptor.js.map