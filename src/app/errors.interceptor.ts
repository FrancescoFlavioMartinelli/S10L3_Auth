import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {

  constructor(private auth:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err)=>{
        if(err.error instanceof ErrorEvent) {
          console.log("ERRORE", err.error);
          if(err.error["status"] == 401) {
            this.auth.logout()
          }
        }
        return throwError(err)
      })
    );
  }
}
