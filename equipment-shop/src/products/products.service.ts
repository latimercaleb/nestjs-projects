/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
    productStore: Product[] = []

    addProduct(){ // Add a new product with a menads to generate the ID and push it onto the array
        // Import product and export service into app module
        // Should return ID of new service
        console.log('Tonks')
    }
}
