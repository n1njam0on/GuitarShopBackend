import { CRUDRepository } from '@backend/libs/util/util-types';
import { Injectable } from '@nestjs/common';
import { GuitarEntity } from './guitar.entity';
import { Guitar, GuitarType, StringsNumber } from '@backend/libs/shared/app-types';
import { GuitarModel } from './guitar.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { GuitarQuery } from './query/guitar.query';

type SortingTypeDefinition = 1 | -1 | { $meta: 'textScore' };

@Injectable()
export class GuitarRepository implements CRUDRepository<GuitarEntity, string, Guitar> {
  constructor(
    @InjectModel(GuitarModel.name) private readonly guitarModel: Model<GuitarModel>) {
  }

  public async create(item: GuitarEntity): Promise<Guitar> {
    const newGuitar = new this.guitarModel(item);
    return newGuitar.save();
  }

  public async destroy(id: string): Promise<void> {
    this.guitarModel.deleteOne({ _id: id });
  }

  public async findById(id: string): Promise<Guitar | null> {
    return this.guitarModel
      .findOne({ _id: id })
      .exec();
  }

  public async update(id: string, item: GuitarEntity): Promise<Guitar> {
    return this.guitarModel
      .findByIdAndUpdate(id, item.toObject(), { new: true })
      .exec();
  }

  public async find({ limit, sortDirection, page, stringsNumber, guitarType, price }: GuitarQuery): Promise<Guitar[] | null> {
    const skip = page > 0 ? limit * (page - 1) : 0;

    let type = []
    if(!guitarType){
      type = [GuitarType.Acoustic, GuitarType.Electro, GuitarType.Ukulele]
    }else{
      type = guitarType;
    }

    let strings = []
    if(!stringsNumber){
      strings = [StringsNumber.Four, StringsNumber.Six, StringsNumber.Seven, StringsNumber.Twelve]
    }else{
      strings = stringsNumber;
    }

    let direction: SortingTypeDefinition;
    sortDirection === 'desc' ? direction = -1 : direction = 1;

    let sort;
    price === 'on' ? sort = {price: direction} : sort = {creationDate: direction};

    return this.guitarModel.aggregate([
      {
        $match: {
          guitarType: {$in: [...type]},
          stringsNumber: {$in: [...strings]}
        }
      },
      {$sort: sort},
      { "$skip": skip },
      { "$limit": limit },
    ])

  }
}