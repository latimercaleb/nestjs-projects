import {
  IsAlphanumeric,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  MinLength
} from 'class-validator'

export class AuthDTO {
  @IsNotEmpty()
  @IsEmail()
  email!: string

  @IsAlphanumeric()
  @IsNotEmpty()
  @MinLength(8, {
    message:
      'Custom message for TOO SHORT $constraint1 chars required! Other special vals, $value, $property, $target'
  })
  password!: string

  @IsDateString()
  dob!: Date

  @IsNotEmpty()
  @IsNumber()
  phoneNumber!: number
}
