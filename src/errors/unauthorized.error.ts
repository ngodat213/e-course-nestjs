import { UnauthorizedException } from '@nestjs/common'
import * as TEXT from '../constants/text.constant'
import { ResponseMessage } from 'src/interfaces/response.interface'

/**
 * @class HttpUnauthorizedError
 * @classdesc 401 -> unauthorized
 * @example new HttpUnauthorizedError('unauthorized')
 * @example new HttpUnauthorizedError('error message', new Error())
 */
export class HttpUnauthorizedError extends UnauthorizedException {
  constructor(message?: ResponseMessage, error?: any) {
    super(message || TEXT.HTTP_UNAUTHORIZED_TEXT_DEFAULT, error)
  }
}