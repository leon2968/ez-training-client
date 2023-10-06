import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environment/environment.development";
import {Route, Router} from "@angular/router";
import {MyResponse} from "../models/myResponse";
import {MyLoginResponse} from "../models/myLoginResponse";
import {User} from "../models/user";
import {UserService} from "./user.service";

@Injectable()
export class AuthService {
  userId: number|null = null;
  token: string | null = localStorage.getItem('token');
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private userService: UserService
  ) {
    console.log('running constructor fn for AuthService...');
    this.verifyUserToken();
  }
  verifyUserToken() {
    if(this.token == null){
      this.router.navigate(['/login']).catch();
    }
    this.token != null && this.checkLogin(this.token)
      .subscribe(res =>{
        if(res.success){
          console.log('token is valid');
          this.userId = res.userId;
          console.log('used id' + this.userId);
          //retrieve user info in user micro service
          this.userService.retrieveInstructorInfo(this.userId)
            .subscribe(res=>{
              this.userService.user=res;
            });

        } else {
          console.log('token is invalid');
          localStorage.removeItem('token');
          this.router.navigate(['/login']).catch();
        }
      });
  }

  //observable(token)
  login(user: {username: string, password: string}): Observable<MyLoginResponse>  {
    //auth backend expecting Json requestBody
    return this.httpClient.post<MyLoginResponse>(
      `${environment.gatewayApi}/auth/login`,
      user);
  }

  checkLogin(token: string): Observable<MyLoginResponse> {
    const params = new HttpParams().set('token', token);

    return this.httpClient.get<MyLoginResponse>(`${environment.gatewayApi}/auth/validate`, { params });
  }

  logout(){
    localStorage.removeItem('token');
    this.userId = null;
  }
}

