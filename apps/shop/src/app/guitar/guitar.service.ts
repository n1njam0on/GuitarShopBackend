import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UpdateGuitarDto } from './dto/update-guitar.dto';
import { CreateGuitarDto } from './dto/create-guitar.dto';
import { GuitarEntity } from './guitar.entity';
import { GuitarRepository } from './guitar.repository';
import { GUITAR_NOT_FOUND } from './guitar.constants';
import { GuitarQuery } from './query/guitar.query';
import { Guitar } from '@backend/libs/shared/app-types';


@Injectable()
export class GuitarService {
  constructor(
    private readonly guitarRepository: GuitarRepository

  ) { }

  public async create(dto: CreateGuitarDto) {
    const guitarEntity = await new GuitarEntity(dto);
    return this.guitarRepository
      .create(guitarEntity);
  }

  public async update(id: string, dto: UpdateGuitarDto) {
    const existGuitar = await this.guitarRepository.findById(id);

    if (!existGuitar) {
      Logger.log(`🚀 NotFoundException ${GUITAR_NOT_FOUND}`);
      throw new NotFoundException(GUITAR_NOT_FOUND);
    }
    const newGuitarEntity = new GuitarEntity({ ...existGuitar, ...dto });

    return await this.guitarRepository.update(id, newGuitarEntity);
  }

  public async getGuitar(id: string) {
    const existGuitar = await this.guitarRepository.findById(id);

    if (!existGuitar) {
      Logger.log(`🚀 NotFoundException ${GUITAR_NOT_FOUND}`);
      throw new NotFoundException(GUITAR_NOT_FOUND);
    }

    return existGuitar;
  }

  public async delete(id: string) {
    const existGuitar = await this.guitarRepository.findById(id);

    if (!existGuitar) {
      Logger.log(`🚀 NotFoundException ${GUITAR_NOT_FOUND}`);
      throw new NotFoundException(GUITAR_NOT_FOUND);
    }

    await this.guitarRepository.destroy(id);
  }

  public async exist(id: string) {
    const existGuitar = await this.guitarRepository.findById(id);

    if (!existGuitar) {
      return false;
    }
    return true;
  }

  async getGuitars(query: GuitarQuery): Promise<Guitar[]> {
    return this.guitarRepository.find(query);
  }

}