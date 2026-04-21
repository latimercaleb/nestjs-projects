import {
  Body,
  Controller,
  Get,
  Param,
  ParseArrayPipe,
  ParseBoolPipe,
  ParseFloatPipe,
  ParseIntPipe,
  Post,
  Query,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import {PhoneAuth} from './custom-pipe/phoneNumberAuth'
import { AuthDTO } from './auth.dto'

@Controller('pipes')
export class PipesController {

  @Post('/auth/register')
  @UsePipes(ValidationPipe, PhoneAuth)
  registerUser(@Body() userData: AuthDTO) {
    return {
      Email: `Registered Email is: ${userData.email}`
    }
  }

  @Get('/:id')
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

  @Get('/arrayPipe') // Notes this requires validation pipe to be imported via pkg json and added to main.ts
  getArrayId(@Query('num', ParseArrayPipe) nums) {
    return nums
  }
}
