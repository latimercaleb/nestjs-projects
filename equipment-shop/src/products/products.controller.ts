import {
  Controller,
  Get,
  Header,
  Body,
  Post,
  Param,
  Put,
  NotFoundException,
  Patch
} from '@nestjs/common'
import {ProductsService} from './products.service'
import {Product} from './product.model'
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get('sampleTypes')
  @Header('Content-Type', 'text/html')
  test2(): any {
    return {message: 'New data format'} //  Headers practice
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

  // TODO
  // Question why some backedn devs just use post for everything
  // Do delete, request and response vods then call it for dayon this

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
