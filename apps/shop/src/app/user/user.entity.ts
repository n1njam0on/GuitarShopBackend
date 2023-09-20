import {User} from "@backend/libs/shared/app-types";

export class UserEntity implements User {
  public _id: string;
  public email: string;
  public name: string;
  public passwordHash: string;

  constructor(blogUser: User) {
    this.fillEntity(blogUser);
  }

  public toObject() {
    return {
      _id: this._id,
      email: this.email,
      name: this.name,
      passwordHash: this.passwordHash,
    };
  }

  public fillEntity(blogUser: User) {
    this._id = blogUser._id;
    this.email = blogUser.email;
    this.name = blogUser.name;
  }
}