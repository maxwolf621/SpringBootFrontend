import { Component, OnInit } from '@angular/core';
import { SubModel } from 'src/app/sub/sub-model';
import { SubService } from 'src/app/sub/sub.service';



/* To show All subs */
@Component({
  selector: 'app-sub-side-bar',
  templateUrl: './sub-side-bar.component.html',
  styleUrls: ['./sub-side-bar.component.css']
})
export class SubSideBarComponent implements OnInit {

  subs: SubModel[] = [];
  displayTheAllSubs = false;
  constructor(private subService: SubService) {
    subService.getAllSubs().subscribe((sub: any[]) =>{
      if(sub.length > 3){
        this.subs = sub.splice(0, 3);
        this.displayTheAllSubs = true;
      }
      else{
        this.subs = sub;
      }
    })
   }

  ngOnInit( ): void {
  }

}