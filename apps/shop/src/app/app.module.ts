import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { GuitarModule } from './guitar/guitar.module';
import { AppConfigModule } from '@backend/libs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongooseOptions } from '@backend/libs/util/util-core';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    UserModule,
    GuitarModule,
    AppConfigModule,
    MongooseModule.forRootAsync(getMongooseOptions('application.mongoDb')),
    FileModule
  ],
})
export class AppModule { }
