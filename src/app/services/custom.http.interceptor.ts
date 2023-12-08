import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {from, Observable} from "rxjs";

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.handleAccess(request, next));
  }

  private async handleAccess(request: HttpRequest<any>, next: HttpHandler):
    Promise<HttpEvent<any>> {
    const token =  sessionStorage.getItem('token');
    let changedRequest = request;
    // HttpHeader object immutable - copy values
    const headerSettings: {[name: string]: string | string[]; } = {};
    for (const key of request.headers.keys()) {
      // alert(key);
      // @ts-ignore
      headerSettings[key] = request.headers.getAll(key);
      // alert(headerSettings[key]);
    }
    if (token) {
      headerSettings['Authorization'] = 'Bearer ' + token;
    }
    const newHeader = new HttpHeaders(headerSettings);

    changedRequest = request.clone({
      headers: newHeader});
    // @ts-ignore
    return next.handle(changedRequest).toPromise();
  }

}
