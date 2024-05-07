"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HasRoles = void 0;
const common_1 = require("@nestjs/common");
const auth_constants_1 = require("../auth.constants");
const HasRoles = (...args) => (0, common_1.SetMetadata)(auth_constants_1.HAS_ROLES_KEY, args);
exports.HasRoles = HasRoles;
//# sourceMappingURL=has-roles.decorator.js.map