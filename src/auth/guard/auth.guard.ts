import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/modules/user/user.service";

@Injectable()
export class AuthGuard implements CanActivate{
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext):  Promise<boolean>  {
      const request = context.switchToHttp().getRequest();
      try {
        const token = request.headers.authorization.split(' ')[1];

        if (!token) {
          throw new ForbiddenException('Please provide access token');
        }

        const payload = await this.jwtService.verifyAsync(token, {
          secret: process.env.JWT_SECRET_KEY,
        });

        const user = await this.userService.findOneByEmail(payload.email);
        console.log(user);
        if (!user) {
          throw new BadRequestException(
            'User not belong to token, please try again',
          );
        }
        request.user = user;
      } catch (error) {
        throw new ForbiddenException('Invalid token or expired');
      }
    return true;
  }
}