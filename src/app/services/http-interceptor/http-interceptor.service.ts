import { Injectable, isDevMode } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { SignUpService } from '../sign-up/sign-up.service';
import { HttpResponse } from 'selenium-webdriver/http';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  apiUrl = '';

  constructor(private signUp: SignUpService) {
    if (isDevMode()) {
      console.log('👋 Development!');
      this.apiUrl = environment.apiUrl;
    } else {
      console.log('💪 Production!');
    }
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.log(environment.apiUrl);
    // console.log(req, next);

    this.signUp.onNotify(true);

    console.log('before', req.url);
    req = req.clone({
      // url: req.url.replace('/users', '/albums')
      url: this.apiUrl + req.url
    });
    console.log('after', req.url);

    return next.handle(req)
      .pipe(
        tap((event: HttpEvent<any>) => {
          console.log(event);
          // if (event instanceof HttpResponse) {
            this.signUp.onNotify(false);
          // }
        })
      );
  }
}
