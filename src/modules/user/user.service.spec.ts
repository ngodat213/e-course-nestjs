import { Test, TestingModule } from '@nestjs/testing';
import { FilterQuery, Model } from 'mongoose';
import { lastValueFrom } from 'rxjs';

import { UserService } from './user.service';
import { User } from './user.model';
import { USER_MODEL } from '../../database/database.constants';
import { JwtService } from '@nestjs/jwt';

describe('UserService', () => {
  let service: UserService;
  let model: Model<User>;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService,
        {
          provide: USER_MODEL,
          useValue: {
            findOne: jest.fn(),
            exists: jest.fn(),
            create: jest.fn(),
          },
        },,
        {
          provide: JwtService,
          useValue: {
            constructor: jest.fn(),
            signAsync: jest.fn(),
          },
        },],
    }).compile();

    service = module.get<UserService>(UserService);
    model = module.get<Model<User>>(USER_MODEL);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findByUsername should return user', async () => {
    jest.spyOn(model, 'findOne').mockImplementation(
      (filter?: FilterQuery<User>) =>
        ({
          exec: jest.fn().mockResolvedValue({
            username: 'HydraCoder',
            email: 'ngodat.it213@gmail.com',
          } as User),
        } as any),
    );

    const foundUser = await lastValueFrom(service.findByEmail('ngodat.it213@gmail.com'));
    expect(foundUser).toEqual({
      username: 'HydraCoder',
      email: 'ngodat.it213@gmail.com',
    });
    expect(model.findOne).lastCalledWith({ email:"ngodat.it213@gmail.com"});
    expect(model.findOne).toBeCalledTimes(1);
  });
});
