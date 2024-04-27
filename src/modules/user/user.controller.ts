import { Body, ConflictException, Controller, DefaultValuePipe, Get, Param, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ParseObjectIdPipe } from 'src/shared/pipe/parse.object.id.pipe';
import { Observable, map, mergeMap } from 'rxjs';
import { User } from 'src/models/user.model';
import { RegisterDto } from './user.dto';
import { Response } from 'express';
import { AuthenticatedRequest } from 'src/interfaces/authenticated.request.interface';
import { LocalAuthGuard } from 'src/auth/guard/local-auth.guard';

@Controller({ path: "/users" })
export class UserController {
  constructor(private userService: UserService){}

  @Get(':id')
  getUser(
    @Param('id', ParseObjectIdPipe) id: string,
    @Query('withCourses', new DefaultValuePipe(false)) withCourses: boolean,
    @Query('withExams', new DefaultValuePipe(false)) withExams: boolean,
    @Query('withBlogs', new DefaultValuePipe(false)) withBlogs: boolean,
    @Query('withQAs', new DefaultValuePipe(false)) withQAs: boolean,
    @Query('withFvCourses', new DefaultValuePipe(false)) withFvCourses: boolean,
    @Query('withFvExams', new DefaultValuePipe(false)) withFvExams: boolean,
    @Query('withFvTeacher', new DefaultValuePipe(false)) withFvTeacher: boolean,
    @Query('withFvQAs', new DefaultValuePipe(false)) withFvQAs: boolean,
  ): Observable<Partial<User>>{
    return this
    .userService
    .findById(id, 
      withCourses, 
      withExams, 
      withBlogs, 
      withQAs, 
      withFvCourses, 
      withFvExams, 
      withFvTeacher, 
      withFvQAs
    );
  }

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  Login(
    @Req() req: AuthenticatedRequest, 
    @Res() res: Response
  ) : Observable<Response>{
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
}
