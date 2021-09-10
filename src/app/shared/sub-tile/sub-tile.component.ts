import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubModel } from 'src/app/sub/sub-model';

@Component({
  selector: 'app-sub-tile',
  templateUrl: './sub-tile.component.html',
  styleUrls: ['./sub-tile.component.scss']
})
export class SubTileComponent implements OnInit {

  @Input()
  mySubs !: SubModel[];

  constructor(private router : Router) {}

  ngOnInit(): void {
    console.info("SubTileComponent's ngOnInit");
  }

  goToSub(id : number): void{
    this.router.navigateByUrl('/view-sub/' + id);
  }
}
