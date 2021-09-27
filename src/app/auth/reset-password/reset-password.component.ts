import { T } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthDTO } from '../auth-dto';



@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  constructor() { }

  passwordDTO : AuthDTO ={
    oldPassword : "",
    newPassword : "",
    confirmNewPassword: ""
  }

  // hide password button
  hide ={
    NewPassword : true,
    OldPassword : true
  }
  
  passwordForm!: FormGroup;

  ngOnInit(): void{
    this.passwordForm = new FormGroup({
      oldPassword : new FormControl("",[Validators.required]),
      newPassword : new FormControl("",[Validators.required]),
      confirmNewPassword : new FormControl("",[Validators.required])
    })
  }

  resetPassword(){}

}
