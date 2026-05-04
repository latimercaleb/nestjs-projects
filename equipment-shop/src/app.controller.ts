import {
  Controller,
  Get,
  Query,
  Param,
  HttpCode,
  ParseUUIDPipe,
  Body,
  Post,
  Header,
  Req,
  Res,
  UseGuards,
  UseInterceptors
} from '@nestjs/common'
import {AppService} from './app.service'
import type { Request, Response } from 'express'
import { AuthGuard } from './guards/auth.guard'
import { UserDTO } from './DTO/user.dto'
import { TestInterceptor } from './test/test.interceptor'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/middleware-users')
  createUser(@Body() req: UserDTO){
    return `User created successfully`
  }

  @Get('/middleware-users')
  getAllUser(){
    return this.appService.getAllUsers()
  }

  @Get('sampleTypes')
  @Header('Content-Type', 'text/html')
  test2(): any {
    return {message: 'New data format'} //  Headers practice
  }

  @Get('interceptor')
  @UseInterceptors(TestInterceptor) // Test of interceptor
  helloFromIntercept(): any {
    console.log(1)
    return {message: 'New data format'}
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
    console.log('Request controller method hit') // Will not even be called if middleware filters request. Middleware > Controller
    const token = req['token']
    return {message: 'Loaded if valid token'} // Check token being added via, postman with both correct token, incorrect token, and correct/incorrect route
  }

  @Get('/client')
  contentCheck(@Req() req: Request) {
    const contentType = req.headers['content-type']
    return {contentType, message: "Content confirmed"} // Check content type being added via, postman with both correct content type, incorrect content type, and correct/incorrect route
  }

  @Post('/requestDetails')
  multiMiddleware(@Body() data: any, @Req() req: Request) {
    console.log('In controller method! This never runs since the request/response cycle ends in timestamp middleware')
    return {
        data,
        requestDetails: req['requestDetails'], // This is where the object built out in the middleware would be accessible if I were to call next() in the timestamp middleware, but since I want to end the request/response cycle there to just return the object built out in the middleware, this is not accessible. If I wanted to access it here, I'd have to call next() in the timestamp middleware and then I could access it here with @Req
    }
  }

  @Post('/gen')
  @UseGuards(AuthGuard) // Note: Can put this on controller level as well 
  generateGuardResult(@Body() data: any) {
    console.log('Gen endpoint hit')
    return data
  }

  @Get('/gen/:username')
  @UseGuards(AuthGuard) // Note: Can put this on controller level as well 
  getGuardResult(@Body() data: any, @Query() query: string) {
    console.log('Gen endpoint hit')
    return {data, query}
  }
  
  @Get('users')
  @UseGuards(AuthGuard) // Note: Can put this on controller level as well 
  getUsersAttempt(@Body() data: any, @Query() query: string) {
    console.log("Never runs should 401 due to guard setup")
    return "this is users in the app controller"
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

  @Get('/id-list/:id')
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
