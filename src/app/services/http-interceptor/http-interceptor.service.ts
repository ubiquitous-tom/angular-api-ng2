import { Injectable, isDevMode } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  apiUrl = '';

  constructor() {
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

    // console.log('before', req.url);
    // req = req.clone({
    //   // url: req.url.replace('/users', '/albums')
    //   url: this.apiUrl + req.url
    // });
    // console.log('after', req.url);

    return next.handle(req);
  }
}
