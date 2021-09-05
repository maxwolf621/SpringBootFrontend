import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../auth/shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn:boolean = false;
  faUser = faUser;
  username : string = "";
  photo:string ="";

  constructor(private router: Router,
    private authService : AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.username = this.authService.getUserName();
    
  }

  toUserProfile(){
    this.router.navigateByUrl('/user-profile/' + this.username);
  }

  logout(){
    console.info("log out");
  }
}
