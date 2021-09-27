import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder,FormControl,FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../authservice/auth.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { AuthDTO } from '../auth-dto';
import { $animations } from '../animations';
import { $pages } from '../auth-pages';

export type loginAction = 'register'|'login'|'forgotPassword';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations : $animations
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  loginRequestPayload! : AuthDTO;
  
  isLoggedIn:boolean = false;
  
  hidePassword : boolean = true ;

  readonly SUCCESS = "success";


  pages = $pages;
  page!: loginAction;

  form !: FormGroup
  mail !: FormControl
  newPassword!: FormControl;
  username !: FormControl;
  password !: FormControl;

  // progress bar
  public progress = false;

  constructor(private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private toastr: ToastrService,
              private formBuilder: FormBuilder,
              public matdialogRef : MatDialogRef<LoginComponent>,
              @Inject(MAT_DIALOG_DATA) private action: loginAction)
  {      
      
      // initialize the payload
      this.loginRequestPayload ={
        username : '',
        password : ''
      }

      this.mail = new FormControl(null, [Validators.required, Validators.email]);
      this.newPassword = new FormControl(null, Validators.required);
      this.form = new FormGroup({});
  }


  // add right from column to this.form
  switchPage(page: loginAction) {
 
    // Removes all the controls from the form group
    Object.keys(this.form.controls).forEach( control => {
      this.form.removeControl(control);
    });
    
    // Add the relevant controls to the form according to selected page
    switch(this.page = page) {

      case 'register':
      this.form.addControl('name', this.username);
      this.form.addControl('email', this.mail);
      this.form.addControl('password', this.password);
      break;

      default:
      case 'login':
      this.form.addControl('email', this.mail);
      this.form.addControl('password', this.password);      
      break;

      case 'forgotPassword':
      this.form.addControl('email', this.mail);
      break;
    }
  }


  ngOnInit(): void {
    
      // initialize the form
      this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(1),Validators.maxLength(20)] ]
      
      })
  }

  // send payload via service
  public activate(action: loginAction) {

    this.progress = true;
    
    switch(action) {

      default:
      case 'login':
      console.info("send to backend login");
      break;

      case 'register':
      console.info("send to backend Register");
      break;

      case 'forgotPassword':
      console.info("send to backend ForgotPassword");
      break;
    }
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
