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
  ValidationPipe,
  Header,
  Req,
  Res
} from '@nestjs/common'
import { IsEmail,IsAlphanumeric, IsEmpty, IsNotEmpty, MinLength } from 'class-validator'
import {AppService} from './app.service'
import type { Request, Response } from 'express'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  // TODO migrate these to app controller for review, do this in postman as well
  @Get('sampleTypes')
  @Header('Content-Type', 'text/html')
  test2(): any {
    return {message: 'New data format'} //  Headers practice
  }

  @Get('reqHeaderExample/:key')
  test3(@Req() requestProp: Request, @Res() res: Response) { // When using req annotation type should be Request, same with res, using native express
    // console.log(requestProp) // Object is massive
    const {key} = requestProp.params;
    const queryP = requestProp.query;
    const agent = requestProp.headers['user-agent'] // Extract useful fields from request decorator
    return res.status(303).send({key, queryP, agent})
  }
  
  @Get('/checkToken')
  testTokens(@Req() req: Request) {
    const token = req['token']
    return {message: 'Loaded if valid token'} // Check token being added via, postman with both correct token, incorrect token, and correct/incorrect route
  }

    @Get('/client')
  contentCheck(@Req() req: Request) {
    const token = req['token']
    return {message: 'Client loaded'}
  }

  @Post()
  createMsg(@Body('message') msg: string){
    console.log(msg)
    return `The message was: ${msg}`
  }

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
