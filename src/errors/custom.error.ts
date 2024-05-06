import { HttpException, HttpStatus } from '@nestjs/common'
import { ExceptionInfo } from '../interfaces/response.interface'

/**
 * @class CustomError
 * @classdesc default 500 -> server error
 * @example new CustomError({ message: 'error message' }, 400)
 * @example new CustomError({ message: 'error message', error: new Error(xxx) })
 */
export class CustomError extends HttpException {
  constructor(options: ExceptionInfo, statusCode?: HttpStatus) {
    super(options, statusCode || HttpStatus.INTERNAL_SERVER_ERROR)
  }
}