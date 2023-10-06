import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../shared/services/auth.service";
import {UserService} from "../../shared/services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private auth: AuthService,
              private userService: UserService,
              private router: Router) {
  }

  login({value}: NgForm):void {
    this.auth.login(value)
      .subscribe(res => {
        console.log('showing result...');
        console.log(res);
        if (res.success) {
          this.auth.userId = res.userId;
          localStorage.setItem('token', res.token);
          console.log('used id' + this.auth.userId);
          this.userService.retrieveInstructorInfo(this.auth.userId)
            .subscribe(res=>{
              this.userService.user=res;
            });
          this.router.navigate(['/home']).catch();
        }
      });
  }
}
