import { Component, HostBinding, OnInit, ViewChild, Output,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { MatDialog , MatDialogConfig, MatDialogRef } from '@angular/material/dialog'
import { MatSidenav } from '@angular/material/sidenav';
import { FormControl } from '@angular/forms';
import { OverlayContainer } from '@angular/cdk/overlay';
import { AuthService } from 'src/app/auth/authservice/auth.service';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { SignUpComponent } from 'src/app/auth/sign-up/sign-up.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { delay } from 'rxjs/operators';
import { ThemePalette } from '@angular/material/core';
import { User } from 'src/app/auth/user';




@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  /**
   * The @HostBinding() decorator takes one parameter, 
   * the name of the host element property which value we want to assign in the directive.
   */
  @HostBinding('class') className = '';
  
  toggleControl = new FormControl(false);
  
  @ViewChild(MatSidenav)
  sidenav!:MatSidenav;

  isDrawerOpened : boolean = false;

  @Output() 
  drawerToggleEvent = new EventEmitter<boolean>();

  public drawerOnToggle(){
    this.isDrawerOpened = !this.isDrawerOpened;

    // emit the value to base component
    this.drawerToggleEvent.emit(this.isDrawerOpened);
  }



  //@Output 
  //sidenavToggle = new EventEmitter();

  /*
  public onToggleSidenav = () =>{
      this.sidenavToggle.emit();
  }
  */


  
  faUser = faUser;
  
  user : User = {
    username : '',
    avatar : '',
    isLoggedIn: false
  };
  
  // Theme Switcher
  readonly DARKMODE = 'dark-theme';
  color: ThemePalette = "accent";

  // dialog for login/signup
  private dialogRef !: MatDialogRef<any>;

  constructor(private router: Router,
    private authService : AuthService,
    public matDialog : MatDialog,
    private overlay: OverlayContainer,
    private observer: BreakpointObserver) { }

  ngOnInit(): void {

    this.user = {
      username : this.authService.getUserName(),
      avatar :　'',
      isLoggedIn : this.authService.isLoggedIn()
    }

    // theme switcher
    this.toggleControl.valueChanges.subscribe((darkMode) => {
      console.info("turn on light mode : ");

      const lightClassName = "light-theme";

      if (darkMode) {
        this.overlay.getContainerElement().classList.add(lightClassName);
        document.body.classList.add(lightClassName);
      } else {
        this.overlay.getContainerElement().classList.remove(lightClassName);
        document.body.classList.remove(lightClassName);
      }
    });
  }

  ngAfterViewInit() {
    /*
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
      */
  }

  /* for sideNav 
  toggleSideNav(sideNav: MatSidenav) {
    sideNav.toggle().then((result: any) => {
      console.log(result);
      console.log(`Status：${result.type}`);
    });
  }
  */

  /**
   * check loggedIn user activities
   */
  toUserActivity(){
    this.router.navigateByUrl('/user-activity/' + this.user.username);
  }

  logout(){
    this.authService.logout();
    window.location.reload();
  }

  // dialog for login and signup
  openDialog(action: string){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose  = false;
    dialogConfig.height = "500px";
    dialogConfig.width = "500px";
    
    switch(action){
      case "login": 
        this.dialogRef = this.matDialog.open(LoginComponent,dialogConfig);
        
      break;
      case "signup" : 
        this.dialogRef = this.matDialog.open(SignUpComponent, dialogConfig);
      break;
    }

    this.dialogRef.afterClosed().subscribe(result=>{
      if(result === 'success'){
        window.location.reload();
      }
    })
  }
}



