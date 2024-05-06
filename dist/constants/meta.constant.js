"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GUEST_REQUEST_METADATA = exports.CACHE_TTL_METADATA = exports.CACHE_KEY_METADATA = exports.HTTP_RESPONSE_TRANSFORM_TO_PAGINATE = exports.HTTP_RESPONSE_TRANSFORM = exports.HTTP_SUCCESS_MESSAGE = exports.HTTP_SUCCESS_CODE = exports.HTTP_ERROR_MESSAGE = exports.HTTP_ERROR_CODE = void 0;
const constants = require("@nestjs/common/constants");
exports.HTTP_ERROR_CODE = '__appHttpErrorCode__';
exports.HTTP_ERROR_MESSAGE = '__appHttpErrorMessage__';
exports.HTTP_SUCCESS_CODE = constants.HTTP_CODE_METADATA;
exports.HTTP_SUCCESS_MESSAGE = '__appHttpSuccessMessage__';
exports.HTTP_RESPONSE_TRANSFORM = '__appHttpResponseTransform__';
exports.HTTP_RESPONSE_TRANSFORM_TO_PAGINATE = '__appHttpResponseTransformToPaginate__';
exports.CACHE_KEY_METADATA = '__appCacheKey__';
exports.CACHE_TTL_METADATA = '__appCacheTTL__';
exports.GUEST_REQUEST_METADATA = '__appGuestRequestOption__';
//# sourceMappingURL=meta.constant.js.map