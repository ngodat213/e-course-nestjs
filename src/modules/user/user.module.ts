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

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forFeature(jwtConfig),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule.forFeature(jwtConfig)],
      useFactory: (config: ConfigType<typeof jwtConfig>) => {
        return {
          secret: config.secretKey,
          signOptions: { expiresIn: config.expiresIn },
        } as JwtModuleOptions;
      },
      inject: [jwtConfig.KEY]
    })
  ],
  controllers: [UserController],
  exports: [UserService, PassportModule],
  providers: [UserService, LocalStrategy, JwtStrategy]
})
export class UserModule {}
