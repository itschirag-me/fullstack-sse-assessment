import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { SuccessMessages } from 'src/constant/successMessages';

@Injectable()
export class SuccessResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => ({
        status: 'success',
        code: data.code || HttpStatus.OK,
        message: data.message || SuccessMessages.default.SUCCESS,
        data: data.data !== undefined ? data.data : data,
      })),
    )
  }
}
