/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
    productStore: Product[] = []

    generateID(): number {
        return Math.floor(1000 + Math.random() * 9000);
    }

    addProduct(title: string, desc: string, price: number) {
        console.log(`Params are: ${title} ${desc} ${price}`)
        const id =  `${price + this.generateID()}__${title.slice(0,2)}`
        const product = new Product(id, title,desc,price)
        this.productStore.push(product)
        return {new_product_id: product.id};
    }

    getProducts(): Product[] {
        return [...this.productStore]
    }
}
