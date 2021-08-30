import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginRequestPayload} from './login-request.payload';

import { AuthService } from '../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  loginRequestPayload! : LoginRequestPayload;
  isError!: boolean;

  // dependency injection
  constructor(private authService: AuthService,private activatedRoute: ActivatedRoute,
    private router: Router, private toastr: ToastrService) { 
      this.loginRequestPayload ={
        username : '',
        password : ''
      }
    }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      // initialize payloads
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  // getters
  get username(){ return this.loginForm.get('username');}
  get password(){ return this.loginForm.get("Password");}

  login(){
    // pass vlues of the user-input to login-request-payload
    this.loginRequestPayload ={
      username : this.loginForm.get('username')!.value,
      password : this.loginForm.get('password')!.value
    }
    console.log(this.loginRequestPayload);
   
    // to backend
    this.authService.login(this.loginRequestPayload).subscribe(
      data => { 
        this.isError = false;
        //this.router.navigateByUrl('');
        this.toastr.success('Login Successful');
    }, error => {
      this.isError = true;
      throwError(error);
    });

  }



  
}
