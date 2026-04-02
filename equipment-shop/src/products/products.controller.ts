/* eslint-disable prettier/prettier */
import { Controller, Get, Header, Body, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.model';
@Controller('products')
export class ProductsController {
    constructor(private productService: ProductsService) {}
    @Get()
    getProducts(): Product[]{
        return this.productService.getProducts()
    }

    @Get('sampleTypes')
    @Header('Content-Type','text/html')
    test2(): any{
        return {message: 'New data format'} //  Headers practice
    }

    @Post()
    generateProducts(@Body('title') productTitle: string, @Body('description') desc: string, @Body('price') amt: number){// Using the Body param to fetch request params
        return this.productService.addProduct(productTitle, desc, amt)
    }
}
