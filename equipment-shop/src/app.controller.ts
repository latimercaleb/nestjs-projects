import {Controller, Get, Query, Param, HttpCode, ParseIntPipe, ParseFloatPipe, ParseBoolPipe} from '@nestjs/common'
import {AppService} from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // TODO: Pull pipes into its own controller, write your own service layer for it
  @Get('/pipes/:id')
  getId(@Param('id', ParseIntPipe) id): any {
    return {
      message: id
    }
  }

  @Get('/decimalPipe/:id')
  getDecimalId(@Param('id', ParseFloatPipe) id): any {
    return {
      message: id
    }
  }

  @Get('/booleanPipe/:id')
  geBooleanId(@Param('id', ParseBoolPipe) id): any {
    return {
      message: id
    }
  }

  // @Get('/arrayPipe') // TODO This throws error, look into later
  // getArrayId(@Query('num', ParseArrayPipe) nums) {
  //   return nums
  // }

  @Get(':id')
  @HttpCode(202)
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
