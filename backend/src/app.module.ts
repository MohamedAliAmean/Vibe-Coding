import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SectionsModule } from './sections/sections.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/sections-db'),
    SectionsModule,
  ],
})
export class AppModule {}
