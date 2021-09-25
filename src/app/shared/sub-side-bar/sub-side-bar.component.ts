import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubModel } from 'src/app/sub/sub-model';
import { SubService } from 'src/app/sub/subservice/sub.service';



/* To show All subs */
@Component({
  selector: 'app-sub-side-bar',
  templateUrl: './sub-side-bar.component.html',
  styleUrls: ['./sub-side-bar.component.css']
})
export class SubSideBarComponent implements OnInit {

  subs: SubModel[] = [];
  
  displayTheAllSubs = false;

  constructor(private subService: SubService,
    private router:Router) {
  }

  ngOnInit( ): void {
    this.subService.getAllSubs().subscribe((subs: any[]) =>{
      // do not show all the subs in sub-side bar 
      if(subs.length > 3){
        this.subs = subs.splice(0, 3);
        this.displayTheAllSubs = true;
      }
      else{
        this.subs = subs;
      }
    });
  }

  listAll(){
    this.router.navigateByUrl('/list-sub');
  }
}
