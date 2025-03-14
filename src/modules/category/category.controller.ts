import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JwtGuard } from '../auth/guard';
import { ApiSecurity } from '@nestjs/swagger';

@Controller('categories')
@ApiSecurity('bearerAuth')
@UseGuards(JwtGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto, @Req() req: any) {
    const userId = req.user.id;
    return this.categoryService.create(createCategoryDto, userId);
  }

  @Get()
  async findAll(@Req() req: any) {
    const userId = req.user.id;
    return this.categoryService.findAll(userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: any) {
    const userId = req.user.id;
    return this.categoryService.findOne(id, userId);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto, @Req() req: any) {
    const userId = req.user.id;
    return this.categoryService.update(id, updateCategoryDto, userId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: any) {
    const userId = req.user.id;
    return this.categoryService.remove(id, userId);
  }
}
