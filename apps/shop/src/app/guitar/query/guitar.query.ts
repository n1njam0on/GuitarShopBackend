import { IsEnum, IsIn, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { DEFAULT_GUITAR_COUNT_LIMIT } from '../guitar.constants';
import { GuitarType } from '@backend/libs/shared/app-types';
import { StringsNumber } from '@backend/libs/shared/app-types';
import { DEFAULT_SORT_DIRECTION } from '../guitar.constants';

export class GuitarQuery {
  @Transform(({ value }) => +value || DEFAULT_GUITAR_COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit = DEFAULT_GUITAR_COUNT_LIMIT;

  @IsOptional()
  @IsEnum(GuitarType)
  public guitarType?: GuitarType;


  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection: 'desc' | 'asc' = DEFAULT_SORT_DIRECTION;


  @Transform(({ value }) => +value)
  @IsOptional()
  public page: number;


  @IsOptional()
  @IsEnum(StringsNumber)
  public stringsNumber: StringsNumber;

  @IsIn(['on', 'off'])
  @IsOptional()
  public price: 'on' | 'off' = 'off'

}