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

  //@Output 
  //sidenavToggle = new EventEmitter();

  /*
  public onToggleSidenav = () =>{
      this.sidenavToggle.emit();
  }
  */

  isLoggedIn:boolean = false;
  faUser = faUser;
  username : string = "";
  photo:string ="";
  
  private dialogRef !: MatDialogRef<any>;

  constructor(private router: Router,
    private authService : AuthService,
    public matDialog : MatDialog,
    private overlay: OverlayContainer,
    private observer: BreakpointObserver) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.username = this.authService.getUserName();

    this.toggleControl.valueChanges.subscribe((darkMode) => {
      /**
       * true => turn on darkMode
       */
      console.info(darkMode);

      const darkClassName = 'dark-theme';
      this.className = darkMode ? darkClassName : '';
      
      if (darkMode) {
        this.overlay.getContainerElement().classList.add(darkClassName);
      } else {
        this.overlay.getContainerElement().classList.remove(darkClassName);
      }
    });
  }

  ngAfterViewInit() {
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
  }

  toUserProfile(){
    this.router.navigateByUrl('/user-profile/' + this.username);
  }

  logout(){
    this.authService.logout();
    window.location.reload();
  }

  openDialog(action: String){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose  = false;
    dialogConfig.height = "500px";
    
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
        this.router.navigateByUrl('');
        window.location.reload();
      }
    })
  }

  toggleSideNav(sideNav: MatSidenav) {
    sideNav.toggle().then((result: any) => {
      console.log(result);
      console.log(`Status：${result.type}`);
    });
  }
}
function ngAfterViewInit() {
  throw new Error('Function not implemented.');
}

