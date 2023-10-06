import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {MyResponse} from "../models/myResponse";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environment/environment.development";
import {AuthService} from "./auth.service";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User|null = null;
  constructor(
    private httpClient: HttpClient) { }


  retrieveInstructorInfo(userId: number): Observable<User> {
    console.log("retrieving user ... : " + userId);
    return this.httpClient.get<User>(`${environment.gatewayApi}/instructor/uid/${userId}`);
  }
}
