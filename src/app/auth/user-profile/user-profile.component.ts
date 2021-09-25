import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user';
import { AuthService } from '../authservice/auth.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user !: User;

  constructor(private route: ActivatedRoute, 
              private authService : AuthService) 
  {
      this.user = {
        username : "",
        avatar : "",
        mail : "",
        aboutMe : ""
      }
  }
  
  ngOnInit(): void{
    this.authService.getUserInformation().subscribe(
      (user) =>{
        this.user = user;
        console.info("Fetch User Information Successfully")
      },
      (error) =>{
        console.warn("Error :" + error);
      }
    )
  }

  update() {
    this.authService.updateUserInformation(this.user).subscribe(
      (result)=>{
        console.info("Successfully" + result);
      },
      (error) =>{
        throwError(error);
      }
    )
  }
}