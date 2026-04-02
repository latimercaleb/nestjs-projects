/* eslint-disable prettier/prettier */
import { Controller, Get, Header, Body, Post } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get()
  test(): string{
        return 'Reaches product controller'
    }

    @Get('sampleTypes')
    @Header('Content-Type','text/html')
    test2(): any{
        return {message: 'New data format'} //  Headers practice
    }

    @Post()
    generateProducts(@Body('title') productTitle: string){
        // Call service to insert product
        // Pull parames off the body of the request
        // Consume all needed properties
        // Return the returned ID
        // Fixing up sub-module, then review code and fill in gaps, then finish out module
    }
}
