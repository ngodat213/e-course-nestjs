import { Body, ConflictException, Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Post, Put, Query, Req, Request, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { ParseObjectIdPipe } from 'src/shared/pipe/parse.object.id.pipe';
import { Observable, map, mergeMap } from 'rxjs';
import { User } from 'src/modules/user/user.model';
import { ChangeAvatarDTO, RegisterDto, UpdateUserDTO, ResetPasswordDTO } from './user.dto';
import { Response } from 'express';
import { AuthenticatedRequest } from 'src/interfaces/authenticated.request.interface';
import { LocalAuthGuard } from 'src/auth/guard/local-auth.guard';
import { GetUser } from 'src/decorators/current.user.decorator';
import { ApiBearerAuth, ApiConsumes, ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { HasRoles } from 'src/auth/guard/has-roles.decorator';
import { RoleType } from 'src/shared/enum/role.type.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileToBodyInterceptor} from 'src/decorators/api.file.decorator';

@ApiTags('Auth')
@ApiBearerAuth()
@Controller({ path: "/users" })
export class UserController {
  constructor(
    private userService: UserService,
  ){}

  @Get()
  @ApiQuery({ name: 'q', required: false })
  @UseGuards(AuthGuard, RolesGuard)
  @HasRoles(RoleType.USER, RoleType.ADMIN, RoleType.TEACHER)
  GetAllUsers(
    @Query('q') keyword? :string,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip?: number,
  ):Observable<User[]>{
    return this.userService.findAll(keyword, skip, limit);
  }

  @Get('/current')
  @UseGuards(AuthGuard, RolesGuard)
  @HasRoles(RoleType.ADMIN, RoleType.USER, RoleType.TEACHER)
  GetCurrentUser(@GetUser() user: User) {
    return user;
  }

  @Post('/login')
  @ApiConsumes('multipart/form-data')
  @UseGuards(LocalAuthGuard)
  @ApiProperty()
  Login(
    @Req() req: AuthenticatedRequest, 
    @Res() res: Response
  ) : Observable<Response>{
    console.log(process.env.JWT_SECRET_KEY)
    console.log(process.env.JWT_EXPIRES_IN)
    return this.userService.login(req.user).pipe(
        map(token => {
          return res
            .header('Authorization', 'Bearer ' + token.access_token)
            .json(token)
            .send()
        })
      );
  }

  @Post('/register')
  @ApiConsumes('multipart/form-data')
  Register(
    @Body() registerDto: RegisterDto,
    @Res() res: Response
  ): Observable<Response> {
    const email = registerDto.email;
    return this.userService.exitsByEmail(email).pipe(
      mergeMap(exits => {
        if(exits){
          throw new ConflictException(`email: ${email} is existed`);
        }else{
          return this.userService.register(registerDto).pipe(
            map(user => 
              res.location('/users/' + user.id)
              .status(201)
              .send()
            )
          );
        }
      })
    );
  }

  @Put('/:id')
  @ApiConsumes('multipart/form-data')
  @UseGuards(AuthGuard, RolesGuard)
  @HasRoles(RoleType.ADMIN, RoleType.USER, RoleType.TEACHER)
  updateUser(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() requestBody: UpdateUserDTO,
    @GetUser() currentUser: User,
  ) {
    return this.userService.updateById(id, requestBody, currentUser);
  }

  @Put('/avatar/:id')
  @ApiConsumes('multipart/form-data')
  @UseGuards(AuthGuard, RolesGuard)
  @HasRoles(RoleType.ADMIN, RoleType.USER, RoleType.TEACHER)
  @UseInterceptors(FileInterceptor('file'), FileToBodyInterceptor)
  updateAvatarUser(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() body: ChangeAvatarDTO,
    @GetUser() currentUser: User,
  ) {
    return this.userService.changedAvatar(id, body, currentUser);
  }

  @Post('/forgot-password/:email')
  @ApiConsumes('multipart/form-data')
  resetPassword(
    @Param('email') email: string,
  ) {
    return this.userService.sendEmailForgotPassword(email);
  }
  
  @Post('/reset-password')
  setNewPassword(
    @Body() requestBody: ResetPasswordDTO
  ) {
    return this.userService.changedPassword(requestBody);
  }
}