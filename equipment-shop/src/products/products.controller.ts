import {
  Controller,
  Get,
  Body,
  Post,
  Param,
  Put,
  NotFoundException,
  Patch,
  Delete,
} from '@nestjs/common'
import {ProductsService} from './products.service'
import {Product} from './product.model'

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get()
  getProducts(): Product[] {
    return this.productService.getProducts()
  }

  @Get(':id')
  getProduct(@Param('id') id: string): Product | NotFoundException {
    return this.productService.getProduct(id)
  }

  @Put(':id') // Note: Put is updating the entire request object, if undefined reset value
  updateProduct(@Param('id') id: string, @Body() productData: Product) {
    return this.productService.updateProduct(id, productData)
  }

  @Patch(':id') // Note: Patch is updating the part of the request object sent, if undefined use previous value
  patchProduct(@Param('id') id: string, @Body() productData: Product) {
    return this.productService.patchProduct(id, productData)
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