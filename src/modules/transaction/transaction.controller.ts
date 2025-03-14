import { Controller, Get, Post, Body, Query, Req, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { JwtGuard } from '../auth/guard';
import { ApiSecurity } from '@nestjs/swagger';
import { CreateTransactionDto } from './dtos';

@Controller('transactions')
@ApiSecurity('bearerAuth')
@UseGuards(JwtGuard)
export class TransactionController {
  constructor(private transactionsService: TransactionService) {}

  @Post()
  async create(@Body() createTransactionDto: CreateTransactionDto, @Req() req: any) {
    const userId = req.user.id;
    return this.transactionsService.create(createTransactionDto, userId);
  }

  @Get()
  async findAll(@Req() req: any) {
    const userId = req.user;
    return this.transactionsService.findAll(userId);
  }

  @Get('summary')
  async summary(@Query('period') period: 'day' | 'week' | 'month' | 'year', @Req() req: any) {
    const {id: userId, role} = req.user.id;
    return this.transactionsService.getSummary(userId, period, role);
  }
}
