import { Controller, Get, HttpStatus, Inject, Logger, NotFoundException, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import 'multer';
import { FileService } from './file.service';
import appConfig from 'libs/config/src/lib/app.config';
import { fillObject } from '@backend/libs/util/util-core';
import { UploadedFileRdo } from './rdo/uploaded-file.rdo';
import { ConfigType } from '@nestjs/config';
import { GuitarService } from '../guitar/guitar.service';
import { GUITAR_NOT_FOUND } from '../guitar/guitar.constants';
import { ApiResponse } from '@nestjs/swagger';
import {MongoidValidationPipe} from '@backend/libs/shared/shared-pipes';
import { FileValidationPipe } from '@backend/libs/shared/shared-pipes';
import { JwtAuthGuard } from '@backend/libs/shared/shared-guards';

@Controller('files')
export class FileController {

  constructor(
    private readonly fileService: FileService,
    
    @Inject(appConfig.KEY)
    private readonly applicationConfig: ConfigType<typeof appConfig>,
    private readonly guitarService: GuitarService,
  ) { }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new file has been successfully created.'
  })
  @Post('/upload/:guitarId')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(@UploadedFile(FileValidationPipe) file: Express.Multer.File, @Param('guitarId', MongoidValidationPipe) guitarId: string) {
    console.log(file);
    const existGuitar = await this.guitarService.exist(guitarId);
    if(!existGuitar){
      Logger.log(`🚀 NotFoundException ${GUITAR_NOT_FOUND}`);
      throw new NotFoundException(GUITAR_NOT_FOUND);
    }
    const newFile = await this.fileService.saveFile(file);
    const path = `${this.applicationConfig.serveRoot}${newFile.path}`;
    await this.guitarService.update(guitarId, {photo: path})
    return fillObject(UploadedFileRdo, Object.assign(newFile, { path }));
  }

  @Get(':fileId')
  public async show(@Param('fileId', MongoidValidationPipe) fileId: string) {
    const existFile = await this.fileService.getFile(fileId);
    const path = `${this.applicationConfig.serveRoot}${existFile.path}`;
    return fillObject(UploadedFileRdo, Object.assign(existFile, { path }));
  }
}
