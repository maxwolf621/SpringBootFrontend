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

  file !: File;

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
        console.info(user);
        this.user = {
          username !: user.username,
          avatar !: user.avatar,
          mail !: user.mail,
          aboutMe !: user.aboutMe 
        }
        console.info("Fetch User Information Successfully")
      }
    )
  }

  onSelectedFile($event : any){
    if($event.target.files){
      
      // get file object
      this.file = $event.target.files.item(0);

      // image preview
      const reader = new FileReader();
      reader.readAsDataURL(this.file);

      console.info("send image to backend");

      this.onUpload();
    }
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

  onUpload(){
    this.authService.onFileUpload(this.file).subscribe(
      (message) =>{
        console.info(message);
      },(error) =>{
        throwError(error);
      }
    )
    console.info("1231241");
  }

}