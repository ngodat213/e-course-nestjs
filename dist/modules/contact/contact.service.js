"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactService = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const mongoose_1 = require("mongoose");
const rxjs_1 = require("rxjs");
const database_constants_1 = require("../../database/database.constants");
let ContactService = class ContactService {
    constructor(contactModel, req) {
        this.contactModel = contactModel;
        this.req = req;
    }
    findAll(keyword, skip = 0, limit = 10) {
        if (keyword) {
            return (0, rxjs_1.from)(this.contactModel
                .find({ title: { $regex: '.*' + keyword + '.*' } })
                .skip(skip)
                .limit(limit)
                .exec());
        }
        else {
            return (0, rxjs_1.from)(this.contactModel.find({}).skip(skip).limit(limit).exec());
        }
    }
    findById(id) {
        return (0, rxjs_1.from)(this.contactModel.findOne({ _id: id }).exec()).pipe((0, rxjs_1.mergeMap)((p) => (p ? (0, rxjs_1.of)(p) : rxjs_1.EMPTY)), (0, rxjs_1.throwIfEmpty)(() => new common_1.NotFoundException(`contact: $id was not found`)));
    }
    save(data) {
        const createContact = this.contactModel.create({
            ...data
        });
        return (0, rxjs_1.from)(createContact);
    }
    update(id, data) {
        return (0, rxjs_1.from)(this.contactModel
            .findOneAndUpdate({ _id: id }, { ...data, updateBy: { _id: this.req.user.id } }, { new: true })
            .exec()).pipe((0, rxjs_1.mergeMap)((p) => (p ? (0, rxjs_1.of)(p) : rxjs_1.EMPTY)), (0, rxjs_1.throwIfEmpty)(() => new common_1.NotFoundException(`contact: $id was not found`)));
    }
    deleteAll() {
        return (0, rxjs_1.from)(this.contactModel.deleteMany({}).exec());
    }
    deleteById(id) {
        return (0, rxjs_1.from)(this.contactModel.findByIdAndDelete({ _id: id }).exec()).pipe((0, rxjs_1.mergeMap)((p) => (p ? (0, rxjs_1.of)(p) : rxjs_1.EMPTY)), (0, rxjs_1.throwIfEmpty)(() => new common_1.NotFoundException(`contact: $id was not found`)));
    }
};
exports.ContactService = ContactService;
exports.ContactService = ContactService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }),
    __param(0, (0, common_1.Inject)(database_constants_1.CONTACT_MODEL)),
    __param(1, (0, common_1.Inject)(core_1.REQUEST)),
    __metadata("design:paramtypes", [mongoose_1.Model, Object])
], ContactService);
//# sourceMappingURL=contact.service.js.map