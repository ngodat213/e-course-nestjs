"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = void 0;
const common_1 = require("@nestjs/common");
const TEXT = require("../constants/text.constant");
class ValidationError extends common_1.HttpException {
    constructor(error) {
        super(error || TEXT.VALIDATION_ERROR_DEFAULT, common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.ValidationError = ValidationError;
//# sourceMappingURL=validation.error.js.map