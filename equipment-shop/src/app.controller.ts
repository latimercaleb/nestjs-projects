import {Controller, Get, Query, Param} from '@nestjs/common'
import {AppService} from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    console.log('Sweet')
    return this.appService.getHello()
  }

  @Get(':id')
  simpleQueryParam(
    @Param('id') id: number,
    @Query('name') name: string,
    @Query('sortOrder') ord: string,
    @Query('page') pageCount: string
  ) {
    return {
      id,
      name,
      ord,
      pageCount
    }
  }
}
