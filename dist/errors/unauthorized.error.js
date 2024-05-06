"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpUnauthorizedError = void 0;
const common_1 = require("@nestjs/common");
const TEXT = require("../constants/text.constant");
class HttpUnauthorizedError extends common_1.UnauthorizedException {
    constructor(message, error) {
        super(message || TEXT.HTTP_UNAUTHORIZED_TEXT_DEFAULT, error);
    }
}
exports.HttpUnauthorizedError = HttpUnauthorizedError;
//# sourceMappingURL=unauthorized.error.js.map