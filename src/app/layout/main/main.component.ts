import { Component, OnInit,HostListener } from '@angular/core';
import { AuthService } from 'src/app/auth/authservice/auth.service';
import { User } from 'src/app/auth/user';
import { SubModel } from 'src/app/sub/sub-model';
import { SubService } from 'src/app/sub/subservice/sub.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  events: string[] = [];

  isDrawerOpened : boolean = false;
  
  appropriateClass:string = '';
  
  user : User ={
    isLoggedIn : false
  }

  subs !: SubModel[];

  constructor(private authService : AuthService,
              private subService : SubService)
  {
    this.getScreenHeight();
    this.subService.getSubscriptions().subscribe(
      (favSubs) => {
        this.subs = favSubs;
      }, (error) =>{
        console.info(error);
      }
    )
  }

  ngOnInit(): void {
    this.user ={
      isLoggedIn : this.authService.isLoggedIn()
    }
    
  }


  @HostListener('window:resize', ['$event'])
  getScreenHeight(){
    console.info(window.innerHeight);
    
    if(window.innerHeight<=412){
      this.appropriateClass = 'bottomRelative';
    }else{
      this.appropriateClass = 'bottomStick';
    }
  }

  setDrawerState(isOpened : boolean){
    this.isDrawerOpened = isOpened;
  }
}
