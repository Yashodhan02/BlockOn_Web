
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { GlobalDataService } from 'src/app/services/global-data.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private router: Router, private globalDataService: GlobalDataService) { }

  UserName: any;
  userData: any;

  intercept(request: HttpRequest<unknown>, next: HttpHandler,): Observable<HttpEvent<unknown>> {


    // this.userData = this.globalDataService.getUserData();
    // const myToken = this.globalDataService.getToken();
    this.userData = sessionStorage.getItem('user_data');
    const myToken = sessionStorage.getItem('token');
    // const usname = this.userData.UserName;

    if (myToken) {
      debugger
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${myToken}` }, //"Bearer "+myToken
      })
    }

    return next.handle(request).pipe(
      catchError((err: any) => {
        if (err.status === 401) {
          // this.toast.warning({detail:"Warning", summary:"Session has been expired, Login again!"});
          this.router.navigate(['/authentication/login'])
          location.reload();
        }
        return throwError(() => new Error("Exception error occured!"))
      })
    );
  }
}