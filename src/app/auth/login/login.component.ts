import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { LoginRequestPayload} from './login-request.payload';

import { AuthService } from '../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  loginRequestPayload! : LoginRequestPayload;
  isLoggedIn:boolean = false;
  readonly SUCCESS = "success";
  // dependency injection
  constructor(private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private router: Router, 
              private toastr: ToastrService,
              private formBuilder: FormBuilder,
              public matdialogRef : MatDialogRef<LoginComponent>
              ){      
      this.loginRequestPayload ={
        username : '',
        password : ''
      }
    }
  ngOnInit(): void {
      this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(1),Validators.maxLength(20)] ]
      })
  }

  get myForm(){
    return this.loginForm.controls;
  }

  login(){
    // to backend
    this.authService.login(this.loginForm.value).subscribe(
      data => { 
        this.toastr.success('Login Successful');
        this.isLoggedIn = true;
        this.matdialogRef.close(this.SUCCESS);

    }, error => {
      this.isLoggedIn = false;
      this.toastr.error("Login Fail Please Check Again");
      throwError(error);
    });
  }

  closeClick(){
    this.matdialogRef.close();
  }
}
