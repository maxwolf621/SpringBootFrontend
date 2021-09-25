import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../authservice/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { $providers } from './login-providers';
import { AuthDTO } from '../auth-dto';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  readonly providers = $providers;

  signupForm!: FormGroup;
  
  private signupRequestPayload!: AuthDTO;
  
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

    this.signupForm = new FormGroup({
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.email])
    });
  }

  signup(){
      this.signupRequestPayload = {
        username : this.signupForm.get('username')!.value,
        mail : this.signupForm.get('email')!.value,
        password : this.signupForm.get('password')!.value
      }

      this.authService.signup(this.signupRequestPayload).subscribe
      (
        () => { 
          this.router.navigate(['/login'], { queryParams: { registered: 'true' } });
        }, 
        (error) => {
          this.toastrService.error('Registration Failed! Please try again' + error);
        }
      );
  }

  signupWith(url: string){
    console.info("");
    this.authService._signOrLoginWithOAuth2(url);
  }

}
