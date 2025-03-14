import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto<T> {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  success: boolean;

  @ApiProperty()
  message: string;

  @ApiProperty()
  errors: string | Record<string, string> ;

  @ApiProperty()
  data: T;

  constructor(success: boolean, data: T, errors: string | Record<string, string>, message: string, statusCode: HttpStatus ) {
    this.success = success;
    this.data = data;
    this.errors = errors;
    this.message = message;
    this.statusCode = statusCode;
  }
}