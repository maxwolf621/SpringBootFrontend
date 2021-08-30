import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { SubModel } from '../sub-model';
import { SubService } from '../sub.service';
import { SideBarComponent } from 'src/app/shared/side-bar/side-bar.component';
@Component({
  selector: 'app-list-subs',
  templateUrl: './list-subs.component.html',
  styleUrls: ['./list-subs.component.css']
})
export class ListSubsComponent implements OnInit {

  subs: SubModel[] =[];
  constructor(private subService: SubService) { 
  }

  ngOnInit(): void {
    this.subService.getAllSubs().subscribe(sub=>{
      this.subs = sub;
    }, (error) =>{
      throwError(error);
    })
  }  
  
}
