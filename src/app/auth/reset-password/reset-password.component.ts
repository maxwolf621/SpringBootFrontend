import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthDTO } from '../auth-dto';
import { AuthService } from '../authservice/auth.service';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {


  passwordDTO : AuthDTO ={
    oldPassword : "",
    newPassword : "",
    resetPasswordToken: ""
  }

  resetPasswordPage : boolean = false;

  // hide password button
  hide ={
    NewPassword : true,
    OldPassword : true
  }
  
  passwordForm!: FormGroup;


  constructor(private router : Router,
              private authService : AuthService,
              private activeRoute : ActivatedRoute,
              private toastr : ToastrService,
              private matDialogRef : MatDialogRef<ResetPasswordComponent>) {} 
  ngOnInit(): void{
    this.passwordForm = new FormGroup({
      newPassword : new FormControl("",[Validators.required]),
      confirmNewPassword : new FormControl("",[Validators.required])
    })
    console.log(this.router.url);
    this.resetPasswordPage = this.router.url.split("/").includes("resetPassword");

    if(!this.resetPasswordPage){
      const oldPassword = new FormControl("",[Validators.required]);
      this.passwordForm.addControl('oldPassword', oldPassword);
    }

    console.log("Is this Reset Password Page ? " + this.resetPasswordPage );
  }

  onSubmit(): any {
    if(this.resetPasswordPage){
      return this.resetPassword();
    }
    else{
      return this.changePassword();
    }
  }

  resetPassword(){
    this.passwordDTO ={
      newPassword : this.passwordForm.get('newPassword')?.value,
      resetPasswordToken : this.activeRoute.snapshot.params.token
    };
    console.info(this.passwordDTO.resetPasswordToken);
    this.authService.resetPassword(this.passwordDTO).subscribe(
      () =>{
        this.toastr.success("Reset your password successfully");
      }, () =>{
        this.toastr.success("Failed to reset your password");
      }
    )
    this.router.navigateByUrl("/");
  }
  
  changePassword(){
    this.passwordDTO ={
      oldPassword : this.passwordForm.get('oldPassword')?.value,
      newPassword : this.passwordForm.get('newPassword')?.value
    };
    this.authService.changePassword(this.passwordDTO).subscribe(
      () =>{
        this.toastr.success("Change your password successfully");
        this.matDialogRef.close('SUCCESS');
        this.router.navigateByUrl("/");
      }, () =>{
        this.toastr.error("Failed to change your password");
      }
    )
  }

}
