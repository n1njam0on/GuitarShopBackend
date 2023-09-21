import appConfig from 'libs/config/src/lib/app.config';
import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { ensureDir } from 'fs-extra';
import { writeFile } from 'node:fs/promises';
import 'multer';
import { extension } from 'mime-types';
import * as crypto from 'node:crypto';
import { FileEntity } from './file.entity';
import { FileRepository } from './file.repository';


type WrittenFile = {
  hashName: string;
  fileExtension: string;
  path: string;
}


@Injectable()
export class FileService {
  constructor(
    @Inject(appConfig.KEY)
    private readonly applicationConfig: ConfigType<typeof appConfig>,
    private readonly fileRepository: FileRepository,
  ) { }


  private async writeFile(file: Express.Multer.File): Promise<WrittenFile> {
    const uploadDirectoryPath = this.applicationConfig.uploadDirectory;

    const uuid = crypto.randomUUID();
    const fileExtension = extension(file.mimetype);
    const hashName = `${uuid}.${fileExtension}`;

    const destinationFile = `${uploadDirectoryPath}/${hashName}`;

    await ensureDir(uploadDirectoryPath);
    await writeFile(destinationFile, file.buffer);

    return {
      hashName,
      fileExtension,
      path: `/${hashName}`,
    };
  }


  public async saveFile(file: Express.Multer.File) {
    const writtenFile = await this.writeFile(file);
    const newFile = new FileEntity({
      size: file.size,
      hashName: writtenFile.hashName,
      mimetype: file.mimetype,
      originalName: file.originalname,
      path: writtenFile.path,
    });

    return this.fileRepository.create(newFile);
  }

  public async getFile(fileId: string) {
    const existFile = await this.fileRepository.findById(fileId);

    if (!existFile) {
      Logger.log(`🚀 NotFoundException File with ${fileId} not found.`);
      throw new NotFoundException(`File with ${fileId} not found.`);
    }

    return existFile;
  }
}
