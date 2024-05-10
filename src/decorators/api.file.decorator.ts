import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { ApiProperty, ApiPropertyOptions } from "@nestjs/swagger";
import { Observable } from "rxjs";

export const ApiFile = (options?: ApiPropertyOptions): PropertyDecorator => (
  target: Object,
  propertyKey: string | symbol,
) => {
  if (options?.isArray) {
    ApiProperty({
      type: 'array',
      items: {
        type: 'file',
        properties: {
          [propertyKey]: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    })(target, propertyKey);
  } else {
    ApiProperty({
      type: 'file',
      properties: {
        [propertyKey]: {
          type: 'string',
          format: 'binary',
        },
      },
    })(target, propertyKey);
  }
};

@Injectable()
export class FilesToBodyInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest();
    if (req.body && Array.isArray(req.files) && req.files.length) {
      req.files.forEach((file: Express.Multer.File) => {
        const { fieldname } = file;
        if (!req.body[fieldname]) {
          req.body[fieldname] = [file];
        } else {
          req.body[fieldname].push(file);
        }
      });
    }

    return next.handle();
  }
}

@Injectable()
export class FileToBodyInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest();
    if (req.body && req.file?.fieldname) {
      const { fieldname } = req.file;
      if (!req.body[fieldname]) {
        req.body[fieldname] = req.file;
      }
    }

    return next.handle();
  }
}