import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Source } from 'src/schemas/source.schema';
import { CreateSourceDto, UpdateSourceDto } from './dto';
import { ResponseDto } from 'common/dtos';

@Injectable()
export class SourceService {
  constructor(@InjectModel(Source.name) private sourceModel: Model<Source>) {}

  async create(createSourceDto: CreateSourceDto, userId: string){  
    try{
      const newSource = await this.sourceModel.create({ ...createSourceDto, userId });
      return new ResponseDto(true, newSource, {}, 'Successfully created category', HttpStatus.CREATED);
    }catch(error){
      return new ResponseDto(false, {}, error, 'Somethig bad happen', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(userId: string){
    const sources = await this.sourceModel.find({ userId });
    return new ResponseDto(true, sources, {}, 'Successfully get all sources', HttpStatus.OK);
  }

  async findOne(id: string, userId: string) {
    const source = await this.sourceModel.findOne({ _id: id, userId });
    if (!source) return new ResponseDto(false, {}, {}, 'Source not found', HttpStatus.NOT_FOUND);
    return new ResponseDto(true, {source}, {}, 'Successfully get source', HttpStatus.OK);
  }

  async update(id: string, updateSourceDto: UpdateSourceDto, userId: string){
    try{
      const updated = await this.sourceModel.findOneAndUpdate(
        { _id: id, userId },
        updateSourceDto,
        { new: true }
      );
      if (!updated) return new ResponseDto(false, {}, {}, 'Source not found', HttpStatus.NOT_FOUND);
      return new ResponseDto(true, {updated}, {}, 'Successfully updated the source', HttpStatus.OK);
    
    }catch(error){
      return new ResponseDto(false, {}, error, 'Somethig bad happen', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: string, userId: string) {
    try{
      const deleted = await this.sourceModel.deleteOne({ _id: id, userId });
      if (!deleted) return new ResponseDto(false, {}, {}, 'Source not found', HttpStatus.NOT_FOUND);
      return new ResponseDto(true, {deleted}, {}, 'Successfully deleted the source', HttpStatus.OK);
    }catch(error){
      return new ResponseDto(false, {}, error, 'Somethig bad happen', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
