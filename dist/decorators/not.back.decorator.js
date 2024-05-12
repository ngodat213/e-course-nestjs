"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsNotBlank = void 0;
const class_validator_1 = require("class-validator");
function IsNotBlank(property, validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: "isNotBlank",
            target: object.constructor,
            propertyName: propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate(value) {
                    return typeof value === "string" && value.trim().length > 0;
                }
            }
        });
    };
}
exports.IsNotBlank = IsNotBlank;
//# sourceMappingURL=not.back.decorator.js.map