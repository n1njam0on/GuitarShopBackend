import { Module } from '@nestjs/common';
import { UserController } from './user.contrroller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel } from './user.model';
import { UserSchema } from './user.model';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { getJwtOptions } from '@backend/libs/config';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';


@Module({
  imports: [MongooseModule.forFeature([
    { name: UserModel.name, schema: UserSchema }
  ]),
  JwtModule.registerAsync({
    inject: [ConfigService],
    useFactory: getJwtOptions
  })],
  controllers: [UserController],
  providers: [UserService, UserRepository, JwtAccessStrategy]
})
export class UserModule { }