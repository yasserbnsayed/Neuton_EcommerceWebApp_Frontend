import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
// import jwtDecode from 'jwt-decode';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    if (localStorage.getItem('userToken') != null) {
      this.setUserData();
    }
  }

  baseURL = 'https://localhost:7210/api/';
  userData = new BehaviorSubject(null);
  regiter(body: any): Observable<any> {
    return this._HttpClient.post(this.baseURL + 'Account/Register', body);
  }

  login(body: any): Observable<any> {
    return this._HttpClient.post(this.baseURL + 'Account/Login', body);
  }

  setUserData(): void {
    let endecodedToken = JSON.stringify(localStorage.getItem('userToken'));
    let decodedToken: any = jwtDecode(endecodedToken);
    this.userData.next(decodedToken);
  }

  logout() {
    localStorage.removeItem('userToken');
    this.userData.next(null);
    this._Router.navigate(['/auth']);
  }

  // register
  // {
  //   "userName": "AhmedEid98",
  //   "password": "Ahmed@123",
  //   "confirmPassword": "Ahmed@123",
  //   "phone": "1234",
  //   "emailAddress": "eid@gmail.com"
  // }

  // login
  // {
  //   "emailAddress": "eid@gmail.com",
  //   "phone": "1234",
  //   "password": "Ahmed@123",
  //   "rememberMe": true
  // }
}
