import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { EMPTY, Observable, from, map, mergeMap, of, throwIfEmpty } from 'rxjs';
import { USER_MODEL } from 'src/database/database.constants';
import { User, UserModel } from 'src/models/user.model/user.model';
import { RegisterDto } from './user.dto';
import { RoleType } from 'src/shared/enum/role.type.enum';
import { UserPrincipal } from 'src/auth/interfaces/user-principal.interface';
import { TokenResult } from 'src/auth/interfaces/auth.interface';
import { JwtPayload } from 'src/auth/interfaces/jwt.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_MODEL) private userModel: UserModel,
    private jwtService: JwtService,
  ){}

  findByEmail(email: string): Observable<User> {
    return from(this.userModel.findOne({ email: email }).exec());
  }

  exitsByEmail(email: string): Observable<boolean>{
    return from(this.userModel.exists({email}).exec()).pipe(
      map((exits) => exits != null),
    );
  }

  register(data: RegisterDto): Observable<User>{
    const created = this.userModel.create({
      ...data,
      roles: [RoleType.USER],
    });
    return from(created);
  }

  validateUser(username: string, pass: string): Observable<UserPrincipal> {
    return this.findByEmail(username).pipe(
      mergeMap((p) => (p ? of(p) : EMPTY)),
      throwIfEmpty(() => new UnauthorizedException(`username or password is not matched`)),

      mergeMap((user) => {
        const { _id, password, username, email, roles } = user;
        return user.comparePassword(pass).pipe(map(m => {
          if (m) {
            return { id: _id, username, email, roles } as UserPrincipal;
          }else {
            throw new UnauthorizedException('username or password is not matched')
          }
        }))
      })
    );
  }

  login(user: UserPrincipal): Observable<TokenResult>{
    const payload: JwtPayload = {
      id: user.id,
      username: user.username,
      email: user.email,
      photoUrl: user.photoUrl,
      roles: user.roles,
    };
    return from(this.jwtService.signAsync(payload)).pipe(
      map((access_token) => {
        return {access_token};
      }),
    );
  }

  findById(id: string, 
    withCourses = false, 
    withExams = false, 
    withBlogs = false, 
    withQAs = false,
    withFvCourses = false,
    withFvExams = false,
    withFvTeacher = false,
    withFvQAs = false,
  ): Observable<User>{
    const userQuery = this.userModel.findOne({_id: id});
    if(withCourses) userQuery.populate('courses');
    if(withExams) userQuery.populate('finishedExams');
    if(withBlogs) userQuery.populate('blogs');
    if(withQAs) userQuery.populate('qAs');
    if(withFvCourses) userQuery.populate('favouritesCourses');
    if(withFvExams) userQuery.populate('favouritesExams');
    // if(withFvTeacher) userQuery.populate('favouritesTeachers');
    if(withFvQAs) userQuery.populate('favouritesQAs');
    return from(userQuery.exec()).pipe(
      mergeMap((p) => (p? of(p): EMPTY)),
      throwIfEmpty(() => new NotFoundException(`user: $id was not found`)),
    );
  }
}
