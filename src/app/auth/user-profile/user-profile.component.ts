import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user';
import { AuthService } from '../authservice/auth.service';
import { throwError } from 'rxjs';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { $animations } from '../animations';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  animations : $animations
})
export class UserProfileComponent implements OnInit {

  user !: User;

  file !: File;
  dialogRef !: MatDialogRef<any>;

  ASSETS : string = "assets"

  imgLocation : string =  "";

  constructor(private route: ActivatedRoute, 
              private authService : AuthService,
              private matDialog : MatDialog,
              private toastr : ToastrService) 
  {
      this.user = {
        username : "",
        avatar : "",
        mail : "",
        aboutMe : ""
      }

      this.authService.getUserInformation().subscribe(
        (user) =>{
          console.info(user);
          this.user = {
            username !: user.username,
            avatar !: user.avatar,
            mail !: user.mail,
            aboutMe !: user.aboutMe 
          }
          if(this.user.avatar){
            this.imgLocation = `${this.ASSETS}/${this.user.username}/${this.user.avatar}`;
          }
          console.info("Fetch User Information Successfully")
        }
      )
  }


  
  ngOnInit(): void{

  }

  onSelectedFile($event : any){
    if($event.target.files && $event.target.files.length > 0){

      // get file object
      this.file = $event.target.files.item(0);

      console.info("file name " + this.file.name);

      // image preview
      const reader = new FileReader();
      reader.readAsDataURL(this.file);

      console.info("send image to backend" + this.file);
      const formData = new FormData();

      formData.append("file", this.file);
      console.info(formData.get('file'));

      /**
       *  Xhr Request 
       */      
      const xhrReq = new XMLHttpRequest();
      const AVATAR_URL = `${environment.apiUserProfile}/updateAvatar`;
      const jwt =  this.authService.getToken();
      xhrReq.onreadystatechange = () => {

        if (xhrReq.status === 200 && xhrReq.readyState === 4) {
          this.toastr.success('SUCCESS');
          console.log('SUCCESS', xhrReq.responseText);
        } else {
          console.info("Failed To upload the file");
        }
      };

      xhrReq.open("POST",AVATAR_URL, true);
      xhrReq.setRequestHeader("Authorization", `Bearer  ${jwt}`)
      xhrReq.send(formData);
     
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

  // open reset password dialog
  openDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose  = false;
    dialogConfig.height = "500px";
    dialogConfig.width = "500px";

    this.dialogRef = this.matDialog.open(ResetPasswordComponent,dialogConfig);

    this.dialogRef.afterClosed().subscribe(result=>{
      if(result === 'success'){
        window.location.reload();
      }
    })
    }
}