import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class AdminOnlyGuard implements CanActivate{
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = request.headers.authorization['Bearer'];
      console.log(token);
      return true;
  }
}