import { PipeTransform, Injectable, BadRequestException, Logger} from '@nestjs/common';
import 'multer';
import { extension } from 'mime-types';

@Injectable()
export class FileValidationPipe implements PipeTransform {

  async transform(value: Express.Multer.File) {
   const fileExtension = extension(value.mimetype);
    if(fileExtension != 'jpg' && fileExtension != 'png' && fileExtension != 'txt' ){
      Logger.log(`🚀 BadRequestException The file must have a jpg or png extension`);
      throw new BadRequestException('The file must have a jpg or png extension');
    }
    return value;
  }
}
