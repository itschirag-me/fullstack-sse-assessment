import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { SuccessMessages } from 'src/constant/successMessages';

@Injectable()
export class SuccessResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const statusCode = context.switchToHttp().getResponse().statusCode;

    return next.handle().pipe(
      map((data) => ({
        status: 'success',
        code: statusCode || HttpStatus.OK,
        message: data.message || SuccessMessages.default.SUCCESS,
        result: data.data !== undefined ? data.data : data,
      })),
    );
  }
}
