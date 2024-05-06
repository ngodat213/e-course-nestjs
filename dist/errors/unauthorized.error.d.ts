import { UnauthorizedException } from '@nestjs/common';
import { ResponseMessage } from 'src/interfaces/response.interface';
export declare class HttpUnauthorizedError extends UnauthorizedException {
    constructor(message?: ResponseMessage, error?: any);
}
