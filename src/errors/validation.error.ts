import { HttpException, HttpStatus } from '@nestjs/common'
import * as TEXT from '../constants/text.constant'

/**
 * @class ValidationError
 * @classdesc 400 -> bad request
 * @example new ValidationError('error message')
 * @example new ValidationError(new Error())
 */
export class ValidationError extends HttpException {
  constructor(error?: any) {
    super(error || TEXT.VALIDATION_ERROR_DEFAULT, HttpStatus.BAD_REQUEST)
  }
}