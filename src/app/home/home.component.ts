import {AfterViewInit, Component, OnInit} from '@angular/core';
import {User} from "../shared/models/user";
import {UserService} from "../shared/services/user.service";
import {AuthService} from "../shared/services/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit{
  user: User| undefined;

  constructor(
    private userService: UserService,
    private auth: AuthService
  ) {
  }
  ngOnInit() {
    console.log('OnInit() in home component');

  }

  ngAfterViewInit() {
    console.log('AfterViewInit() in home component');
  }
  // ngOnDestroy(): void {
  //   if (this.subscription) {
  //     this.subscription.unsubscribe();
  //   }
  // }
}
