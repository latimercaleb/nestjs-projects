/* eslint-disable prettier/prettier */
import {
    Controller,
    Get,
    Header,
    Body,
    Post,
    Param
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.model';
@Controller('products')
export class ProductsController {
    constructor(private productService: ProductsService) {}

    @Get('sampleTypes')
    @Header('Content-Type','text/html')
    test2(): any{
        return {message: 'New data format'} //  Headers practice
    }

    @Get()
    getProducts(): Product[]{
        return this.productService.getProducts()
    }

    @Get(':id')
    getProduct(@Param('id') id: string) {
        console.log(id)
        //return this.productService.getProducts()
    }



    @Post()
    generateProducts(@Body('title') productTitle: string, @Body('description') desc: string, @Body('price') amt: number){// Using the Body param to fetch request params
        return this.productService.addProduct(productTitle, desc, amt)
    }
}
