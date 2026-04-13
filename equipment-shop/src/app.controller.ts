import {
  Controller,
  Get,
  Query,
  Param,
  HttpCode,
  ParseIntPipe,
  ParseFloatPipe,
  ParseBoolPipe,
  ParseArrayPipe,
  ParseUUIDPipe,
  Body,
  Post,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { IsEmail,IsAlphanumeric, IsEmpty, IsNotEmpty, MinLength } from 'class-validator'
import {AppService} from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/uuid/:id')
  uuID(@Param('id', new ParseUUIDPipe({version: '4'})) id) {
    // 92fabb7e-7314-4938-beeb-1ab855c98767 to test uuid, any other id will be invalid, can configure to test specific uuid in constructor
    return {uuid: id, status: 200}
  }

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
