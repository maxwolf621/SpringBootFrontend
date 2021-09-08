import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../auth/shared/auth.service';
import { MatDialog , MatDialogConfig } from '@angular/material/dialog'
import { LoginComponent } from '../auth/login/login.component';
import { SignUpComponent } from '../auth/sign-up/sign-up.component';

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
    private authService : AuthService,
    public matDialog : MatDialog) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.username = this.authService.getUserName();
    
  }

  toUserProfile(){
    this.router.navigateByUrl('/user-profile/' + this.username);
  }

  logout(){
    this.authService.logout();
  }

  openDialog(action:String){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose  = false;
    dialogConfig.width = "400px";
    dialogConfig.height = "300px";
    
    switch(action){
      case "login": 
        this.matDialog.open(LoginComponent,dialogConfig);
      break;
      case "signup" : 
        this.matDialog.open(SignUpComponent, dialogConfig);
      break;
        
    }

  }

}
