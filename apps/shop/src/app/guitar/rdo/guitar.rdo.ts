import { ApiProperty } from "@nestjs/swagger";
import { GuitarType } from "@backend/libs/shared/app-types";
import { StringsNumber } from "@backend/libs/shared/app-types";
import { Expose, Transform } from "class-transformer";

export class GuitarRdo {
  @ApiProperty({
    description: 'The uniq guitar ID',
    example: '13'
  })
  @Expose({ name: '_id' })
  @Transform(({obj}) => obj._id.toString())
  public guitarId: string;

  @ApiProperty({
    description: 'Guiar name',
    example: 'Fender'
  })
  @Expose()
  public title: string;

  @ApiProperty({
    description: 'Guitar description',
    example: 'Best guitar for backcountry'
  })
  @Expose()
  public description: string;

  @ApiProperty({
    description: 'Guitar type',
    example: 'Ukulele'
  })
  @Expose()
  public guitarType: GuitarType;

  @ApiProperty({
    description: 'Vendore code',
    example: '1E45MT6'
  })
  @Expose()
  public vendorCode: string;

  @ApiProperty({
    description: 'The guitar strings number - 4/6/7/12',
    example: '7'
  })
  @Expose()
  public stringsNumber: StringsNumber;

  @ApiProperty({
    description: 'The guitar price',
    example: '100'
  })
  @Expose()
  public price: number;

  @ApiProperty({
    description: 'The Guitar Picture adress',
    example: '/static/f97cae4a-8999-4d63-afae-16a66d395af9.jpg'
  })
  @Expose()
  public photo: string;

  @ApiProperty({
    description: 'Creation date',
    example: '2012-03-15'
  })
  @Expose()
  public creationDate: Date;
}