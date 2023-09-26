import { ApiProperty } from "@nestjs/swagger";
import { GuitarType } from "@backend/libs/shared/app-types";
import { StringsNumber } from "@backend/libs/shared/app-types";
import { IsDate, IsEnum, IsOptional, IsString, Length, Max, Min } from "class-validator";
import { Transform } from "class-transformer";
import { CREATION_DATE_NOT_VALID } from "../guitar.constants";

export class UpdateGuitarDto {

  @ApiProperty({
    description: 'Guiar name',
    example: 'Fender'
  })
  @Length(10, 100)
  @IsString()
  @IsOptional()
  public title?: string;

  @ApiProperty({
    description: 'Guitar description',
    example: 'Best guitar for backcountry'
  })
  @Length(20, 1024)
  @IsString()
  @IsOptional()
  public description?: string;

  @ApiProperty({
    description: 'Guitar type',
    example: 'Ukulele'
  })
  @IsEnum(GuitarType)
  @IsOptional()
  public guitarType?: GuitarType;

  @ApiProperty({
    description: 'Vendore code',
    example: '1E45MT6'
  })
  @Length(4, 40)
  @IsString()
  @IsOptional()
  public vendorCode?: string;

  @ApiProperty({
    description: 'The guitar strings number - 4/6/7/12',
    example: '7'
  })
  @IsOptional()
  public stringsNumber?: StringsNumber;

  @ApiProperty({
    description: 'The guitar price',
    example: '100'
  })
  @Min(100, { message: 'Minimum price is 100' })
  @Max(1000000, { message: 'Maximum price is 1000000' })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  public price?: number;

  @ApiProperty({
    description: 'Guitar picture',
    example: '/images/guitar.png'
  })
  @IsString()
  @IsOptional()
  public photo?: string;

  @ApiProperty({
    description: 'The guitar creation date',
    example: '1981-03-12',
  })
  @IsDate({ message: CREATION_DATE_NOT_VALID })
  @Transform(({value}) => new Date(value))
  @IsOptional()
  public creationDate?: Date;
}