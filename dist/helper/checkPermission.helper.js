"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Permission = void 0;
const common_1 = require("@nestjs/common");
class Permission {
    static check(id, currentUser) {
        const roles = ['Admin'];
        if (id === currentUser.id)
            return;
        if (currentUser.roles.some(role => roles.includes(role)))
            return;
        throw new common_1.ForbiddenException('User can not perform action');
    }
}
exports.Permission = Permission;
//# sourceMappingURL=checkPermission.helper.js.map