import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../authservice/auth.service';
import { SignupRequestPayload } from './signup-request.payload';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { $providers } from './login-providers';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  
  readonly providers = $providers;

  signupForm!: FormGroup;
  private signupRequestPayload!:SignupRequestPayload;
  
  public hidePassword = true;

  constructor(private authService: AuthService,
              private router: Router,
              private toastrService: ToastrService) {
    this.signupRequestPayload = {
      username: '',
      mail: '',
      password: ''
    };
  }
    
  ngOnInit(): void {

    // https://angular.io/guide/router#router-outlet
    this.signupForm = new FormGroup({
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.email])
    });
  }

  //getters used in component.html
  get username() { return this.signupForm.get('username')}
  get password() { return this.signupForm.get('password')}
  get email()    { return this.signupForm.get('email')}

  signup(){
      // assign input from signup form to payload
      this.signupRequestPayload = {
        username : this.signupForm.get('username')!.value,
        mail : this.signupForm.get('email')!.value,
        password : this.signupForm.get('password')!.value
      }

      // after passing the payload to backend
      this.authService.signup(this.signupRequestPayload)
      .subscribe(() => {
      // if success, then navigate to login page
        this.router.navigate(['/login'], { queryParams: { registered: 'true' } });
      // error handling
      }, () => {
        this.toastrService.error('Registration Failed! Please try again');
      });
  }
}
