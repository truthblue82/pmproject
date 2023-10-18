import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user';
import { Role } from 'src/app/models/role';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: User[];

  constructor(private http: HttpClient) {
    this.users = [];
    if (sessionStorage.getItem('token') !== null) {
      const data: any = {
        id: sessionStorage.getItem('userId') || '',
        username: sessionStorage.getItem('firstName') || '',
        email: sessionStorage.getItem('email') || '',
        fullname: sessionStorage.getItem('lastName') || '',
        password: '',
        phone: sessionStorage.getItem('phone') || '',
        roles: [sessionStorage.getItem('roles') || ''],
        token: sessionStorage.getItem('token') || '',
        rememberMe: sessionStorage.getItem('rememberMe') ? sessionStorage.getItem('rememberMe') : false
      };
      this.users.push(data);
    }
  }

  getCurrentUser() {
    return of(this.users);
  }

  signUp(user: User) {
    //return this.http.post(`${environment.BASE_SERVICE_URL}/api/auth/signup`, user, {observe:'response'});
    return this.http.post(`${environment.OAUTH2_BASE_URL}/${environment.GATEWAY_USER_REGISTER_URI}`, user,{observe:'response'});
  }

  authenticate(user: any) {
    return this.http.post(`${environment.BASE_SERVICE_URL}/api/auth/signin`, {username: user.username, password: user.password},{observe:'response'});
  }

  storeSession(user: any):void {
    sessionStorage.setItem('token', user.accessToken);
    sessionStorage.setItem('firstName', user.firstName);
    sessionStorage.setItem('lastName', user.lastName);
    sessionStorage.setItem('email', user.email);
    sessionStorage.setItem('roles', user.roles);
    sessionStorage.setItem('userId', user.id);
    sessionStorage.setItem('rememberMe', user.rememberMe);
    //refreshToken?
    this.users.push(user);
  }
  clearSession():void {
    sessionStorage.clear();
  }
  logout() {
    sessionStorage.clear();
    this.users.splice(0,1);
  }
  updateAccountDetails(data: any) {
    return this.http.put(`${environment.BASE_SERVICE_URL}/api/users`, data, {observe: "response"});
  }
  changeUserPassword(data: any) {
    return this.http.put(`${environment.BASE_SERVICE_URL}/api/users/`, {
      data: {oldpassword: data.oldPassword, newpassword: data.newPassword},
    }, {observe: "response"});
  }
}
