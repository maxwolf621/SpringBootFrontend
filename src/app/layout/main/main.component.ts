import { Component, OnInit,HostListener } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  events: string[] = [];
  opened : boolean = false;
  
  appropriateClass:string = '';
  
  @HostListener('window:resize', ['$event'])
  getScreenHeight(){
    console.info(window.innerHeight);
    
    if(window.innerHeight<=412){
      this.appropriateClass = 'bottomRelative';
    }else{
      this.appropriateClass = 'bottomStick';
    }
  }
  constructor(){
    this.getScreenHeight();
  }

  ngOnInit(): void {
  }

  open(){
    console.info("opened :" + this.opened);
  }
}
