import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../authservice/auth.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog'
import { AuthDTO } from '../auth-dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  loginRequestPayload! : AuthDTO;
  
  isLoggedIn:boolean = false;
  
  hidePassword : boolean = true ;

  readonly SUCCESS = "success";

  constructor(private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private toastr: ToastrService,
              private formBuilder: FormBuilder,
              public matdialogRef : MatDialogRef<LoginComponent>
              )
  {      
      
      // initialize the payload
      this.loginRequestPayload ={
        username : '',
        password : ''
      }
  }

  ngOnInit(): void {
    
      // initialize the form
      this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(1),Validators.maxLength(20)] ]
      })
  }

  get loginFormControl(){
    return this.loginForm.controls;
  }

  login(){
    // to backend
    this.authService.login(this.loginForm.value).subscribe(
      () => {         
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
