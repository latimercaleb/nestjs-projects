import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';
import { PipesController } from './pipes/pipes.controller';
import { LoggingMiddleware } from './middleware/logging';
import { TokenMiddleware } from './middleware/tokens';
import { ContentTypeMiddleware } from './middleware/content-type.middleware';
import { convertMiddleware } from './middleware/conversions';

@Module({
  imports: [],
  controllers: [AppController, ProductsController, PipesController],
  providers: [AppService, ProductsService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) { // Mandatory for registering middleware at module level, for global use main.ts and app.use()
    consumer.apply(LoggingMiddleware).forRoutes('*')
    consumer.apply(TokenMiddleware).forRoutes('/checkToken')
    consumer.apply(ContentTypeMiddleware).forRoutes('/client')
    consumer.apply(convertMiddleware).forRoutes('*')
  }
}
