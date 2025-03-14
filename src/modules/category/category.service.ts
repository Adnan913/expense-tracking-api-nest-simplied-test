import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from 'src/schemas/category.schema';
import { ResponseDto } from 'common/dtos';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto, userId: string){
    try{
      const newCategory = await this.categoryModel.create({ ...createCategoryDto, userId });
      return new ResponseDto(true, newCategory, {}, 'Successfully created category', HttpStatus.CREATED);
    }catch(error){
      return new ResponseDto(false, {}, error, 'Somethig bad happen', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(userId: string) {
    const cateories = await this.categoryModel.find({ userId });
    return new ResponseDto(true, cateories, {}, 'Successfully get all categories', HttpStatus.OK);
  }

  async findOne(id: string, userId: string) {
    const category = await this.categoryModel.findOne({ _id: id, userId });
    if (!category) return new ResponseDto(false, {}, {}, 'Catorgy not found', HttpStatus.NOT_FOUND);
    return new ResponseDto(true, {category}, {}, 'Successfully get category', HttpStatus.OK);
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto, userId: string) {
    try{
      const updated = await this.categoryModel.findOneAndUpdate(
        { _id: id, userId },
        updateCategoryDto,
        { new: true }
      );
      if (!updated) return new ResponseDto(false, {}, {}, 'Catorgy not found', HttpStatus.NOT_FOUND);
      return new ResponseDto(true, {updated}, {}, 'Successfully updated the category', HttpStatus.OK);
    
    }catch(error){
      return new ResponseDto(false, {}, error, 'Somethig bad happen', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: string, userId: string) {
    try{
      const deleted = await this.categoryModel.deleteOne({ _id: id, userId });
      if (!deleted) return new ResponseDto(false, {}, {}, 'Catorgy not found', HttpStatus.NOT_FOUND);
      return new ResponseDto(true, {deleted}, {}, 'Successfully deleted the category', HttpStatus.OK);
    }catch(error){
      return new ResponseDto(false, {}, error, 'Somethig bad happen', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}