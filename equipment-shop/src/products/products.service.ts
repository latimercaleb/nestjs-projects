import {Injectable, NotFoundException} from '@nestjs/common'
import {Product} from './product.model'

@Injectable()
export class ProductsService {
  productStore: Product[] = []

  private generateID(): number {
    return Math.floor(1000 + Math.random() * 9000)
  }

  addProduct(title: string, desc: string, price: number) {
    const id = `${this.generateID()}-${title.slice(0, 2)}`
    const product = new Product(id, title, desc, price)
    this.productStore.push(product)
    return {new_product_id: product.id}
  }

  getProducts(): Product[] {
    return [...this.productStore]
  }

  getProduct(productId: string): Product | NotFoundException {
    const foundProduct = this.productStore.find((product) => product.id === productId)
    if(!foundProduct) throw new NotFoundException('Product ID unidentified')
    return foundProduct
  }

  patchProduct(
    id: string,
    productToUpdate: {title?: string; description?: string; price?: number}
  ) {
    const idxToUpdate = this.productStore.findIndex((product) => product.id === id)
    if (idxToUpdate >= 0) {
      this.productStore[idxToUpdate] = {...this.productStore[idxToUpdate], ...productToUpdate}
      return this.productStore[idxToUpdate]
    } else {
      throw new NotFoundException('Invalid ID')
    }
  }

  updateProduct(
    id: string,
    productToUpdate: {title?: string; description?: string; price?: number}
  ) {
    // Decide if ID is in list, if it is update the item and return a success message
    const idxToUpdate = this.productStore.findIndex((product) => product.id === id)
    if (idxToUpdate >= 0) {
      this.productStore[idxToUpdate] = {
        ...this.productStore[idxToUpdate],
        title: productToUpdate.title ?? '',
        description: productToUpdate.description ?? '',
        price: productToUpdate.price ?? 0
      }
      return this.productStore[idxToUpdate]
    } else {
      throw new NotFoundException('Invalid ID')
    }
  }

  cancelProduct(id: string){
    const idxToRemove = this.productStore.findIndex((product) => product.id === id)
     if (idxToRemove >= 0) {
      this.productStore.splice(idxToRemove, 1)
      return {message: 'Delete Successful'}
    } else {
      throw new NotFoundException('Invalid ID')
    }
  }
}
