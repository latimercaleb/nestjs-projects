import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';
import { PipesController } from './pipes/pipes.controller';

@Module({
  imports: [],
  controllers: [AppController, ProductsController, PipesController],
  providers: [AppService, ProductsService],
})
export class AppModule {}
