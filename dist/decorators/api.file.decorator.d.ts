import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { ApiPropertyOptions } from "@nestjs/swagger";
import { Observable } from "rxjs";
export declare const ApiFile: (options?: ApiPropertyOptions) => PropertyDecorator;
export declare class FilesToBodyInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
export declare class FileToBodyInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
