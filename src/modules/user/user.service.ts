import { BadRequestException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { EMPTY, Observable, from, map, mergeMap, of, throwIfEmpty } from 'rxjs';
import { USER_MODEL } from '../../database/database.constants';
import { User, UserModel } from 'src/modules/user/user.model';
import { RegisterDto, UpdateUserDTO } from './user.dto';
import { RoleType } from '../../shared/enum/role.type.enum';
import { UserPrincipal } from 'src/interfaces/user-principal.interface';
import { Permission } from 'src/helper/checkPermission.helper';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/interfaces/jwt.interface';
import { TokenResult } from 'src/interfaces/auth.interface';
``
@Injectable()
export class 
UserService {
  constructor(
    @Inject(USER_MODEL) private userModel: UserModel,
    private jwtService: JwtService,
  ){}

  findByEmail(email: string): Observable<User | undefined> {
    return from(this.userModel.findOne({ email: email }).exec());
  }

  findOneByEmail(email: string) {
    return this.userModel.findOne({ email });
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

  validateUser(email: string, pass: string): Observable<UserPrincipal> {
    return this.findByEmail(email).pipe(
      mergeMap((p) => (p ? of(p) : EMPTY)),
      throwIfEmpty(() => new UnauthorizedException(`email: ${email} was not found`)),

      mergeMap((user) => {
        const { _id, password, username, email, roles } = user;
        return user.comparePassword(pass).pipe(map(m => {
          if (m) {
            return { id: _id, username, email, roles } as UserPrincipal;
          }else {
            throw new UnauthorizedException('email or password is not matched')
          }
        }))
      })
    );
  } 

  findAll(keyword?: string, skip = 0, limit = 10): Observable<User[]>{
    if (keyword && keyword.trim() === '') {
      throw new BadRequestException('Do not enter spaces.');
    }
    if(keyword){
      return from(
        this.userModel
        .find({ username: { $regex: keyword, $options: 'i' } })
        .select('-password')
        .skip(skip)
        .limit(limit)
        .exec(),
      );
    }else{
      return from(this.userModel.find({}).select('-password -__v',).skip(skip).limit(limit).exec());
    }
  }

  async updateById(id: string, requestBody: UpdateUserDTO, currentUser: User){
    // if(requestBody.roles){
    //   throw new BadRequestException('You cannot change role');
    // }

    let user = await this.userModel.findById(id);
    if(!user){
      throw new NotFoundException('User does not exist');
    }

    if(user.email != requestBody.email && requestBody.email != null){
      const userByEmail = this.findByEmail(requestBody.email);
      if(userByEmail){
        throw new BadRequestException('Email already exist');
      }
    }

    Permission.check(id, currentUser);

    user.set(requestBody);

    const updatedUser = await this.userModel.findByIdAndUpdate(id, user);

    return {
      username: updatedUser.username,
      photoUrl: updatedUser.photoUrl,
      email: updatedUser.email,
    }
  }
}
