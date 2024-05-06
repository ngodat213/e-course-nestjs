"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpForbiddenError = void 0;
const common_1 = require("@nestjs/common");
const TEXT = require("../constants/text.constant");
class HttpForbiddenError extends common_1.HttpException {
    constructor(error) {
        super(error || TEXT.HTTP_PARAMS_PERMISSION_ERROR_DEFAULT, common_1.HttpStatus.FORBIDDEN);
    }
}
exports.HttpForbiddenError = HttpForbiddenError;
//# sourceMappingURL=forbidden.error.js.map