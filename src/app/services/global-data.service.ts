import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalDataService {
  private userDataKey = 'user_data'  // This will store the user data

  constructor() {}

  setUserData(data: any) {
    // localStorage.setItem(this.userDataKey, JSON.stringify(data));
    sessionStorage.setItem(this.userDataKey, JSON.stringify(data));

  }
  
  setStorageToken(tokenValue: string){
    // localStorage.setItem('token', tokenValue)
    sessionStorage.setItem('token', tokenValue)
  }

  getToken(){
    // return localStorage.getItem('token')
    return sessionStorage.getItem('token')
  }

  getUserData() {
    // const userData = localStorage.getItem(this.userDataKey);
    const userData = sessionStorage.getItem(this.userDataKey);

    return userData ? JSON.parse(userData) : null;
  }
  clearUserData() {
    // localStorage.removeItem(this.userDataKey);
    sessionStorage.removeItem(this.userDataKey);
  }

  isLoggedin():boolean{
    return !!sessionStorage.getItem('token')
  }
}