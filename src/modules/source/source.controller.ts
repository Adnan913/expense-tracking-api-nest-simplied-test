import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { CreateSourceDto } from './dto/create-source.dto';
import { UpdateSourceDto } from './dto/update-source.dto';
import { JwtGuard } from '../auth/guard';
import { SourceService } from './source.service';
import { ApiSecurity } from '@nestjs/swagger';

@Controller('sources')
@ApiSecurity('bearerAuth')
@UseGuards(JwtGuard)
export class SourceController {
  constructor(private readonly sourcesService: SourceService) {}

  @Post()
  async create(@Body() createSourceDto: CreateSourceDto, @Req() req: any) {
    const userId = req.user.id;
    return this.sourcesService.create(createSourceDto, userId);
  }

  @Get()
  async findAll(@Req() req: any) {
    const userId = req.user.id;
    return this.sourcesService.findAll(userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: any) {
    const userId = req.user.id;
    return this.sourcesService.findOne(id, userId);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSourceDto: UpdateSourceDto, @Req() req: any) {
    const userId = req.user.id;
    return this.sourcesService.update(id, updateSourceDto, userId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: any) {
    const userId = req.user.id;
    return this.sourcesService.remove(id, userId);
  }
}