"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpBadRequestError = void 0;
const common_1 = require("@nestjs/common");
const TEXT = require("../constants/text.constant");
class HttpBadRequestError extends common_1.HttpException {
    constructor(error) {
        super(error || TEXT.HTTP_BAD_REQUEST_TEXT_DEFAULT, common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.HttpBadRequestError = HttpBadRequestError;
//# sourceMappingURL=bad-request.error.js.map