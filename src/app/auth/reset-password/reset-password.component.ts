import { T } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthDTO } from '../auth-dto';



@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {


  passwordDTO : AuthDTO ={
    oldPassword : "",
    newPassword : "",
    confirmNewPassword: ""
  }

  href = '';

  resetPasswordPage : boolean = false;

  // hide password button
  hide ={
    NewPassword : true,
    OldPassword : true
  }
  
  passwordForm!: FormGroup;


  constructor(private router : Router ) {} 
  ngOnInit(): void{
    this.passwordForm = new FormGroup({
      oldPassword : new FormControl("",[Validators.required]),
      newPassword : new FormControl("",[Validators.required]),
      confirmNewPassword : new FormControl("",[Validators.required])
    })

    this.href = this.router.url;
    console.log(this.router.url);

    this.resetPasswordPage = this.href.split("/").includes("resetPassword");
    console.log("is Reset Password Page ? " + this.resetPasswordPage );
  }

  resetPassword(){}

}
