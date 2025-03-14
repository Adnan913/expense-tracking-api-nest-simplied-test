import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SourceService } from './source.service';
import { SourceController } from './source.controller';
import { Source, SourceSchema } from 'src/schemas/source.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Source.name, schema: SourceSchema }]),
  ],
  controllers: [SourceController],
  providers: [SourceService],
  exports: [SourceService],
})
export class SourceModule {}
