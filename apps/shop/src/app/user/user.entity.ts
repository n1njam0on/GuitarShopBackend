import {User} from "@backend/libs/shared/app-types";
import { compare, genSalt, hash } from 'bcrypt';
import { SALT_ROUNDS } from './user.constants';

export class UserEntity implements User {
  public _id: string;
  public email: string;
  public name: string;
  public passwordHash: string;

  constructor(user: User) {
    this.fillEntity(user);
  }

  public toObject() {
    return {
      _id: this._id,
      email: this.email,
      name: this.name,
      passwordHash: this.passwordHash,
    };
  }

  public fillEntity(user: User) {
    this._id = user._id;
    this.email = user.email;
    this.name = user.name;
    this.passwordHash = user.passwordHash;
  }

  public async setPassword(password: string): Promise<UserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }
}