import { Types } from 'mongoose';
import { ArgumentMetadata, BadRequestException, Injectable, Logger, PipeTransform } from '@nestjs/common';

const BAD_MONGOID_ERROR = 'Bad entity ID';

@Injectable()
export class MongoidValidationPipe implements PipeTransform {
  transform(value: string, { type }: ArgumentMetadata) {
    if (type !== 'param') {
      Logger.log(`🚀 This pipe must used only with params!`);
      throw new Error('This pipe must used only with params!')
    }

    if (!Types.ObjectId.isValid(value)) {
      Logger.log(`🚀 Bad entity ID`);
      throw new BadRequestException(BAD_MONGOID_ERROR);
    }

    return value;
  }
}
