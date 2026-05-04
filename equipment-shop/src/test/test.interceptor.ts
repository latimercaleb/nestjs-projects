import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class TestInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const currentDate = Date.now()
    console.log('Time in interceptor ')
    return next.handle().pipe(
      tap(() => console.log(`Time after: ${Date.now() - currentDate }ms`))
    );
  }
}
