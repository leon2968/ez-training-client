import {Component, OnInit} from '@angular/core';
import {AuthService} from "../shared/services/auth.service";
import {User} from "../shared/models/user";
import {UserService} from "../shared/services/user.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  title: string = 'ezTraining';
  user: User|undefined;

  constructor(
    public auth: AuthService,
    private userService: UserService) {
  }

  ngOnInit(){
  }

  logout() {
    this.auth.userId = null;
    localStorage.removeItem('token');
  }
}
