import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Guitar, StringsNumber } from '@backend/libs/shared/app-types';
import { GuitarType } from '@backend/libs/shared/app-types';

@Schema({
  collection: 'guitars',
  timestamps: true,
})
export class GuitarModel extends Document implements Guitar {
  @Prop({
    required: true,
  })
  public title: string;

  @Prop({
    required: true,
  })
  public description: string;

  @Prop({
    default: '',
  })
  public photo: string;

  @Prop({
    required: true,
    type: String,
    enum: GuitarType,
  })
  public guitarType: GuitarType;

  @Prop({
    required: true,
    type: String,
    enum: StringsNumber,
  })
  public stringsNumber: StringsNumber;

  @Prop({
    required: true,
  })
  public vendorCode: string;

  @Prop({
    required: true,
  })
  public price: number;

  @Prop({
    required: true,
    default: new Date(),
  })
  public creationDate: Date;

}

export const GuitarSchema = SchemaFactory.createForClass(GuitarModel);