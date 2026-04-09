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
import { IsEmail,IsAlphanumeric } from 'class-validator'
import {AppService} from './app.service'
class AuthDTO {
  @IsEmail()
  email: string;
  @IsAlphanumeric()
  password: string;
}
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/auth/register')
  @UsePipes(ValidationPipe)
  registerUser(@Body() userData: AuthDTO) {
    return {
      Email: `Registered Email is: ${userData.email}`
    }
  }

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

  @Get('/arrayPipe') // Notes this requires validation pipe to be imported via pckg json and added to main.ts
  getArrayId(@Query('num', ParseArrayPipe) nums) {
    return nums
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
