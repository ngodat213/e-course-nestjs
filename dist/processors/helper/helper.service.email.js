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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
const APP_CONFIG = require("../../app.config");
let EmailService = class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: APP_CONFIG.EMAIL.host,
            secure: APP_CONFIG.EMAIL.secure,
            auth: {
                user: APP_CONFIG.EMAIL.user,
                pass: APP_CONFIG.EMAIL.pass
            }
        });
        this.verifyClient();
    }
    verifyClient() {
        return this.transporter.verify((error) => {
            if (error) {
                this.clientIsValid = false;
                setTimeout(this.verifyClient.bind(this), 1000 * 60 * 30);
                console.log(`client init failed! retry after 30 mins`);
            }
            else {
                this.clientIsValid = true;
                console.log('client init succeed.');
            }
        });
    }
    sendMail(mailOptions) {
        if (!this.clientIsValid) {
            console.log('send failed! (init failed)');
            return false;
        }
        this.transporter.sendMail({
            ...mailOptions,
            from: APP_CONFIG.EMAIL.from
        }, (error, info) => {
            if (error) {
                console.log(`send failed!`);
            }
            else {
                console.log('send succeed.');
            }
        });
    }
    sendMailAs(prefix, mailOptions) {
        return this.sendMail({
            ...mailOptions,
            subject: `[${prefix}] ${mailOptions.subject}`
        });
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], EmailService);
//# sourceMappingURL=helper.service.email.js.map