import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query, UseGuards} from '@nestjs/common';
import { GuitarService } from './guitar.service';
import { GuitarRdo } from './rdo/guitar.rdo';
import { CreateGuitarDto } from './dto/create-guitar.dto';
import { UpdateGuitarDto } from './dto/update-guitar.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject } from '@backend/libs/util/util-core';
import { MongoidValidationPipe } from '@backend/libs/shared/shared-pipes';
import { GuitarQuery } from './query/guitar.query';
import { JwtAuthGuard } from '@backend/libs/shared/shared-guards';


@ApiTags('guitars')
@Controller('guitars')
export class GuitarController {
  constructor(private readonly guitarService: GuitarService) { }

  @ApiResponse({
    type: GuitarRdo,
    status: HttpStatus.CREATED,
    description: 'The new guitar has been successfully created.'
  })
  @UseGuards(JwtAuthGuard)
  @Post('create')
  public async create(@Body() dto: CreateGuitarDto) {
    const newGuitar = await this.guitarService.create(dto);
    return fillObject(GuitarRdo, newGuitar);
  }

  @Get()
  async index(@Query() query: GuitarQuery) {
    const guitars = await this.guitarService.getGuitars(query);
    return fillObject(GuitarRdo, guitars);
  }

  @ApiResponse({
    type: GuitarRdo,
    status: HttpStatus.OK,
    description: 'Task found'
  })
  @Get(':id')
  public async show(@Param('id', MongoidValidationPipe) id: string) {
    const existGuitar = await this.guitarService.getGuitar(id);
    return fillObject(GuitarRdo, existGuitar);
  }

  @ApiResponse({
    type: GuitarRdo,
    status: HttpStatus.CREATED,
    description: 'The guitar has been successfully updated.'
  })
  @UseGuards(JwtAuthGuard)
  @Patch('update/:id')
  public async update(@Body() dto: UpdateGuitarDto, @Param('id', MongoidValidationPipe) id: string) {
    const existGuitar = await this.guitarService.update(id, dto);
    return fillObject(GuitarRdo, existGuitar);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Guitar deleted'
  })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  public async delete(@Param('id', MongoidValidationPipe) id: string) {
    await this.guitarService.delete(id);
  }
}
