import { Guitar, GuitarType, StringsNumber } from "@backend/libs/shared/app-types";

export class GuitarEntity implements Guitar {
  public _id: string;
  public title: string;
  public description: string;
  public guitarType: GuitarType;
  public stringsNumber: StringsNumber;
  public price: number;
  public vendorCode: string;
  public photo?: string;

  constructor(guitar: Guitar) {
    this.fillEntity(guitar);
  }

  public toObject() {
    return {
      _id: this._id,
      title: this.title,
      description: this.description,
      guitarType: this.guitarType,
      stringsNumber: this.stringsNumber,
      price: this.price,
      vendorCode: this.vendorCode,
      photo: this.photo,
    };
  }

  public fillEntity(guitar: Guitar) {
    this._id = guitar._id;
    this.title = guitar.title;
    this.description = guitar.description;
    this.guitarType = guitar.guitarType;
    this.stringsNumber = guitar.stringsNumber;
    this.price = guitar.price;
    this.vendorCode = guitar.vendorCode;
    this.photo = guitar.photo;
  }
}