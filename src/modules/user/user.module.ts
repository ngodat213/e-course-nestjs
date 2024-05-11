import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseModule } from 'src/processors/database/database.module';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
// import jwtConfig from 'src/configs/jwt.config';
import { LocalStrategy } from 'src/auth/strategy/local.strategy';
import { CloudinaryService } from 'src/processors/helper/helper.service.clouldinary';

@Module({
  imports: [
    DatabaseModule,
    // ConfigModule.forFeature(jwtConfig),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      global: true,
      secret: "hydracoder1993744",
      signOptions: {
        expiresIn: "7d" as string
      }
    },
  )],
  controllers: [UserController],
  exports: [UserService, PassportModule],
  providers: [UserService, LocalStrategy, JwtStrategy, CloudinaryService]
})
export class UserModule {}
