import {
  Controller,
  Get,
  Header,
  Body,
  Post,
  Param,
  Put,
  NotFoundException,
  Patch,
  Delete,
  Req,
  Res
} from '@nestjs/common'
import {ProductsService} from './products.service'
import {Product} from './product.model'
import type { Request, Response } from 'express'


@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

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

  @Get()
  getProducts(): Product[] {
    return this.productService.getProducts()
  }

  @Get(':id')
  getProduct(@Param('id') id: string): Product | NotFoundException {
    console.log(id)
    return this.productService.getProduct(id)
  }

  @Put(':id')
  updateProduct(@Param('id') id: string, @Body() productData: Product) {
    return this.productService.updateProduct(id, productData)
    // Note: Put is updating the entire request object, if undefined reset value
  }

  @Patch(':id')
  patchProduct(@Param('id') id: string, @Body() productData: Product) {
    return this.productService.patchProduct(id, productData)
    // Note: Patch is updating the part of the request object sent, if undefined use previous value
  }

  @Delete(':id')
  removeProduct(@Param('id') id: string) {
    return this.productService.cancelProduct(id)
  }

  @Post()
  generateProducts(
    @Body('title') productTitle: string,
    @Body('description') desc: string,
    @Body('price') amt: number
  ) {
    // Using the Body param to fetch request params
    return this.productService.addProduct(productTitle, desc, amt)
  }
}
