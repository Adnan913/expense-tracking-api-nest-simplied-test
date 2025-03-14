import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtGuard } from './modules/auth/guard';
import { ApiSecurity } from '@nestjs/swagger';

@UseGuards(JwtGuard)
@ApiSecurity('bearerAuth')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
