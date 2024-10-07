import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { IApiResponse } from '../interfaces/response.interface';
import { Response } from 'express';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, IApiResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<IApiResponse<T>> {
    return next.handle().pipe(

      map(body => {
        const response: Response = context.switchToHttp().getResponse();

        return {
          statusCode: response.statusCode,
          message: 'Request was succesful',
          data: body
        }
      })
    );
  }
}