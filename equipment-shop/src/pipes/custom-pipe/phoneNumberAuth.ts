import {ArgumentMetadata, BadRequestException, Injectable, PipeTransform} from '@nestjs/common'

@Injectable()
export class PhoneAuth implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) { 
        console.log(value)
        const pN = String(value.phoneNumber)
        const regex = /^\d{10,11}$/
        if(!regex.test(pN)){
            throw new BadRequestException('Needs 10-11 digits to be a valid phone number')
        }
        return value
    }
}
