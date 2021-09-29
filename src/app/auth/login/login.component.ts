import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder,FormControl,FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../authservice/auth.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { AuthDTO } from '../auth-dto';
import { $animations } from '../animations';
import { $AuthDialogs } from '../auth-pages';

export type authAction = 'register' | 'login' | 'forgotPassword';

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



  authDialogs = $AuthDialogs;

  dialog!: authAction;
  
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
              public matdialogRef : MatDialogRef<LoginComponent>)
  {      

      this.username = new FormControl(null);
      this.mail = new FormControl(null, [Validators.required, Validators.email]);
      this.newPassword = new FormControl(null, Validators.required);
      this.password = new FormControl(null, Validators.required);
      
      this.form = new FormGroup({});

      // set login-dialog as default
      this.dialog = 'login';
      this.switchDialog( this.dialog);
  }

  ngOnInit(): void {
      // initialize the form
      this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(1),Validators.maxLength(20)] ]
      
      })
  }


  /**
   * @description Get Current Dialog
   * @returns this.dialog or login-dialog if this.dialog is null
   */
    get currentDialog(){
      return this.authDialogs[this.dialog || 'login']
    }
  
    /**
     * @description switch to responsive Dialog
     */
    switchDialog(dialog: authAction) {
  
      this.dialog = dialog
      
      console.info("dialog : "+ dialog);
   
      // Removes all the controls from the form group
      Object.keys(this.form.controls).forEach( control => {
        this.form.removeControl(control);
      });
      
      // Add the relevant controls to the form according to selected page
      switch(dialog) {
  
        case 'register':
        this.form.addControl('username', this.username);
        this.form.addControl('mail', this.mail);
        this.form.addControl('password', this.password);
        break;
  
        case 'forgotPassword':
        this.form.addControl('mail', this.mail);
        break;
     
        case 'login':
        default:
        this.form.addControl('username', this.username);
        this.form.addControl('password', this.password);      
        break
        
      }
    }

  /**
   * @description Send payload via {@link AuthService} to backend
   */
  public onSubmit(action: authAction) {

    this.progress = true;
    
    switch(action) {
      case 'register':
        console.info("send to backend Register");
        break;

      case 'forgotPassword':
        console.info("send to backend ForgotPassword");
        break;

      case 'login':
        default:
        this.login()
        break;
    }
  }
  
  private login(){

    this.loginRequestPayload = {
      username : this.username.value,
      password : this.password.value
    } 
    
    this.authService.login(this.loginRequestPayload).subscribe(
      () => {         
        this.isLoggedIn = true;
        this.matdialogRef.close(this.SUCCESS);
    }, error => {
      this.isLoggedIn = false;

      this.toastr.error("Login Fail Please Check Again");
      throwError(error);
    });
  }
}
