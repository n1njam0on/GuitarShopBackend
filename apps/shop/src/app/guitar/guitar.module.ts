import { Module } from '@nestjs/common';
import { GuitarService } from './guitar.service';
import { GuitarController } from './guitar.controller';
import { GuitarRepository } from './guitar.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { GuitarModel } from './guitar.model';
import { GuitarSchema } from './guitar.model';

@Module({
  imports: [MongooseModule.forFeature([
    { name: GuitarModel.name, schema: GuitarSchema }
  ])],
  providers: [GuitarService, GuitarRepository],
  controllers: [GuitarController],
  exports: [GuitarService]
})
export class GuitarModule { }