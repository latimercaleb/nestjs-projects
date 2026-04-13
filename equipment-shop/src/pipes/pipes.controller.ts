import {Body, Controller, Get, Param, ParseArrayPipe, ParseBoolPipe, ParseFloatPipe, ParseIntPipe, Post, Query, UsePipes, ValidationPipe} from '@nestjs/common'
import { IsAlphanumeric, IsDate, IsDateString, IsEmail, IsNotEmpty, IsNumber, MinLength } from 'class-validator';
import { PhoneAuth } from 'src/custom-pipe/phoneNumberAuth';

class AuthDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;


  @IsAlphanumeric()
  @IsNotEmpty()
  @MinLength(8, {
    message: "Custom message for TOO SHORT $constraint1 chars required! Other special vals, $value, $property, $target"
  })
  password: string;

  @IsDateString()
  dob: Date;

  @IsNotEmpty()
  @IsNumber()
  phoneNumber: number
}

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

  @Get('/arrayPipe') // Notes this requires validation pipe to be imported via pckg json and added to main.ts
  getArrayId(@Query('num', ParseArrayPipe) nums) {
    return nums
  }
}
