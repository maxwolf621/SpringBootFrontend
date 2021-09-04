import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder,FormGroup, Validators } from '@angular/forms';
import { LoginRequestPayload} from './login-request.payload';

import { AuthService } from '../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';

/**
 * Reference
 * https://www.bezkoder.com/angular-11-form-validation/
 * https://www.positronx.io/angular-7-reactive-forms-validation-tutorial/
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  loginRequestPayload! : LoginRequestPayload;
  submitted = false;

  // dependency injection
  constructor(private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private router: Router, 
              private toastr: ToastrService,
              private formBuilder: FormBuilder){ 
      
      this.loginRequestPayload ={
        username : '',
        password : '1234'
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
        this.submitted = true;
        this.router.navigateByUrl('');
        this.toastr.success('Login Successful');
    }, error => {
      this.submitted = false;
      //alert('Login Fail Please Check Again')
      throwError(error);
    });
  }
}
