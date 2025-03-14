import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsEnum, IsDateString, IsOptional } from 'class-validator';

export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsEnum(TransactionType)
  @ApiProperty()
  type: TransactionType;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  amount: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  category: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  source: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsDateString()
  date: string;

  @IsOptional()
  @ApiProperty()
  @IsString()
  description?: string;
}
