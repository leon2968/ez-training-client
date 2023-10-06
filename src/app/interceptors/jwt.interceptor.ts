import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

/*
HttpInterceptor
 */
@Injectable()
export class JwtInterceptor implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    console.log(`token is ${token}`);
    if(token){
      req = req.clone({
        // authorization pattern: "Bearer token"
        setHeaders: {
          authorization:`Bearer ${token}`
        }
      });
    }
    console.log(req);
    return next.handle(req);
  }
}



