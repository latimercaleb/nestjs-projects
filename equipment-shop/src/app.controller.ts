import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    console.log('Sweet')
    return this.appService.getHello();
  }

  @Get()
  simpleQueryParam(@Query('name') name: string) {
    return `The name sent is ${name}`;
  }
}
