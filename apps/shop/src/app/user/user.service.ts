import { ConflictException, Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AUTH_USER_EXISTS, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG } from './user.constants';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';
import { TokenPayload, User } from '@backend/libs/shared/app-types';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) { }

  public async register(dto: CreateUserDto) {
    const { email, name, password } = dto;

    const user = { email, name, passwordHash: '' }

    const existUser = await this.userRepository
      .findByEmail(email);

    if (existUser) {
      Logger.log(`🚀 ConflictException ${AUTH_USER_EXISTS}`);
      throw new ConflictException(AUTH_USER_EXISTS);
    }

    const userEntity = await new UserEntity(user)
      .setPassword(password)

    return this.userRepository
      .create(userEntity);
  }

  public async verifyUser(dto: LoginUserDto) {
    const { email, password } = dto;
    const existUser = await this.userRepository.findByEmail(email);

    if (!existUser) {
      Logger.log(`🚀 NotFoundException ${AUTH_USER_NOT_FOUND}`);
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    const blogUserEntity = new UserEntity(existUser);
    if (!await blogUserEntity.comparePassword(password)) {
      Logger.log(`🚀 UnauthorizedException ${AUTH_USER_PASSWORD_WRONG}`);
      throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
    }

    return blogUserEntity.toObject();
  }

  public async getUser(id: string) {
    return this.userRepository.findById(id);
  }


  public async createUserToken(user: User) {
    const payload: TokenPayload = {
      sub: user._id,
      email: user.email,
      name: user.name,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    }
  }

}