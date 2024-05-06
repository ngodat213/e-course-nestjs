import { HttpException, HttpStatus } from '@nestjs/common'
import * as TEXT from '../constants/text.constant'

/**
 * @class HttpForbiddenError
 * @classdesc 403 -> forbidden
 * @example new HttpForbiddenError('error message')
 * @example new HttpForbiddenError(new Error())
 */
export class HttpForbiddenError extends HttpException {
  constructor(error?: any) {
    super(error || TEXT.HTTP_PARAMS_PERMISSION_ERROR_DEFAULT, HttpStatus.FORBIDDEN)
  }
}