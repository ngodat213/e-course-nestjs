import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseModule } from 'src/database/database.module';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtModuleOptions, JwtService } from '@nestjs/jwt';
import jwtConfig from 'src/configs/jwt.config';
import { LocalStrategy } from 'src/auth/strategy/local.strategy';
import { AuthService } from './auth.service';
import type jwt from 'jsonwebtoken'

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forFeature(jwtConfig),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      global: true,
      privateKey: process.env.JWT_SECRET_KEY as jwt.Secret,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES_IN as string
      }
    })
  ],
  controllers: [UserController],
  exports: [UserService],
  providers: [UserService, AuthService, LocalStrategy, JwtStrategy]
})
export class UserModule {}
