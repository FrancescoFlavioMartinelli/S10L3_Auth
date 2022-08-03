import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {

  constructor(private auth:AuthService, private router:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err)=>{
        console.log("INTERC", err);
        
        if(err instanceof HttpErrorResponse) {
          console.log("ERRORE", err);
          if(err["status"] == 401) {
            this.auth.logout()
            this.router.navigate(['/login']);
          }
        } else {
          console.log("NOT");
          
        }
        return throwError(err)
      })
    );
  }
}
