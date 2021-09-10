import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../auth/shared/auth.service';
import { MatDialog , MatDialogConfig, MatDialogRef } from '@angular/material/dialog'
import { LoginComponent } from '../auth/login/login.component';
import { SignUpComponent } from '../auth/sign-up/sign-up.component';
import { MatSidenav } from '@angular/material/sidenav';

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
  
  private dialogRef !: MatDialogRef<any>;

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
    window.location.reload();
  }

  openDialog(action: String){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose  = false;
    dialogConfig.width = "500px";
    dialogConfig.height = "400px";
    
    switch(action){
      case "login": 
        this.dialogRef = this.matDialog.open(LoginComponent,dialogConfig);
        
      break;
      case "signup" : 
        this.dialogRef = this.matDialog.open(SignUpComponent, dialogConfig);
      break;
    }
    this.dialogRef.afterClosed().subscribe(result=>{
      if(result === 'success'){
        this.router.navigateByUrl('');
        window.location.reload();
      }
    })
  }

  toggleSideNav(sideNav: MatSidenav) {
    sideNav.toggle().then((result: any) => {
      console.log(result);
      console.log(`Status：${result.type}`);
    });
  }
}
