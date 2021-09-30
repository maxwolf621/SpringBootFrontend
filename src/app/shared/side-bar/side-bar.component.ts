import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/authservice/auth.service';
import { User } from 'src/app/auth/user';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {


  @Input()
  username !: string;

  user : User = {
    username : "",
    avatar : "",
  }

  ASSETS = "assets";

  imgLocation = `${this.ASSETS}/github-cat.jpg`;

  constructor(private router: Router,
              private authService : AuthService) 
  { 
    this.authService.getUserInformation().subscribe(
      (user)=>{
        this.user = {
          username !: user.username,
          avatar !: user.avatar
        }
        if(this.user.avatar){
          this.imgLocation = `${this.ASSETS}/${this.user.username}/${this.user.avatar}`;
        }
      },(error)=>{
        console.warn("Error" + error);
      }
    )


  }

  ngOnInit(): void {
  }
  
  editProfile(){
      this.router.navigateByUrl('user-profile/' + this.user.username);
  }

}
