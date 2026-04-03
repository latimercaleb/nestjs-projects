import {Injectable, NotFoundException} from '@nestjs/common'
import {Product} from './product.model'

@Injectable()
export class ProductsService {
  productStore: Product[] = []

  generateID(): number {
    return Math.floor(1000 + Math.random() * 9000)
  }

  addProduct(title: string, desc: string, price: number) {
    console.log(`Params are: ${title} ${desc} ${price}`)
    const id = `${price + this.generateID()}__${title.slice(0, 2)}`
    const product = new Product(id, title, desc, price)
    this.productStore.push(product)
    return {new_product_id: product.id}
  }

  getProducts(): Product[] {
    return [...this.productStore]
  }

  getProduct(productId: string): Product | NotFoundException {
    // TODO: Find product and return it, if no product return exception
    const foundProduct = this.productStore.find((product) => product.id === productId)
    return foundProduct ?? new NotFoundException('Product ID unidentified') // Trying this short-circuit flow
  }

  updateProduct(
    id: string,
    productToUpdate: {title?: string; description?: string; price?: number}
  ) {
    // Decide if ID is in list, if it is update the item and return a success message
    const idxToUpdate = this.productStore.findIndex((product) => product.id === id)
    if (idxToUpdate) {
      this.productStore[idxToUpdate] = {
        ...this.productStore[idxToUpdate],
        ...productToUpdate
      }
    } else {
      throw new NotFoundException('Invalid ID')
    }
  }
}
