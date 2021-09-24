import { Component, OnInit,HostListener } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  events: string[] = [];

  isDrawerOpened : boolean = false;
  
  appropriateClass:string = '';
  
  constructor(){
    this.getScreenHeight();
  }

  ngOnInit(): void {
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
