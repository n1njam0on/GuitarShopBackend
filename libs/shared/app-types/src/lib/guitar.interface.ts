import { GuitarType } from "./guitar-type.enum";
import { StringsNumber } from "./strings-number.enum";

export interface Guitar {
  _id?: string;
  title: string;
  description: string;
  photo?: string;
  guitarType:GuitarType;
  vendorCode: string;
  stringsNumber: StringsNumber;
  price: number;
}