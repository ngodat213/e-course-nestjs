"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileToBodyInterceptor = exports.FilesToBodyInterceptor = exports.ApiFile = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const ApiFile = (options) => (target, propertyKey) => {
    if (options?.isArray) {
        (0, swagger_1.ApiProperty)({
            type: 'array',
            items: {
                type: 'file',
                properties: {
                    [propertyKey]: {
                        type: 'string',
                        format: 'binary',
                    },
                },
            },
        })(target, propertyKey);
    }
    else {
        (0, swagger_1.ApiProperty)({
            type: 'file',
            properties: {
                [propertyKey]: {
                    type: 'string',
                    format: 'binary',
                },
            },
        })(target, propertyKey);
    }
};
exports.ApiFile = ApiFile;
let FilesToBodyInterceptor = class FilesToBodyInterceptor {
    intercept(context, next) {
        const ctx = context.switchToHttp();
        const req = ctx.getRequest();
        if (req.body && Array.isArray(req.files) && req.files.length) {
            req.files.forEach((file) => {
                const { fieldname } = file;
                if (!req.body[fieldname]) {
                    req.body[fieldname] = [file];
                }
                else {
                    req.body[fieldname].push(file);
                }
            });
        }
        return next.handle();
    }
};
exports.FilesToBodyInterceptor = FilesToBodyInterceptor;
exports.FilesToBodyInterceptor = FilesToBodyInterceptor = __decorate([
    (0, common_1.Injectable)()
], FilesToBodyInterceptor);
let FileToBodyInterceptor = class FileToBodyInterceptor {
    intercept(context, next) {
        const ctx = context.switchToHttp();
        const req = ctx.getRequest();
        if (req.body && req.file?.fieldname) {
            const { fieldname } = req.file;
            if (!req.body[fieldname]) {
                req.body[fieldname] = req.file;
            }
        }
        return next.handle();
    }
};
exports.FileToBodyInterceptor = FileToBodyInterceptor;
exports.FileToBodyInterceptor = FileToBodyInterceptor = __decorate([
    (0, common_1.Injectable)()
], FileToBodyInterceptor);
//# sourceMappingURL=api.file.decorator.js.map