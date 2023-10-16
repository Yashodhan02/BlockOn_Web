import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//     return true;
//   }
  
// }
constructor(private router: Router) {}

canActivate(): boolean {
  // Check if the user is authenticated (e.g., check for a token or other authentication status)
  const isAuthenticated = this.checkAuthenticationStatus();

  if (isAuthenticated) {

    return true;
  } else {
    this.router.navigate(['/authentication/login']);
    return false; 
  }
}

private checkAuthenticationStatus(): boolean {
  
  const token = sessionStorage.getItem('token'); 

  return !!token; 
}
}
