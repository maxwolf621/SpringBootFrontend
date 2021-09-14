import { Component, Input, OnInit } from '@angular/core';
import { PostModel } from '../post-model';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.css']
})
export class PostTileComponent implements OnInit {


  /**
   * father : home.component.ts
   */
  @Input() posts: PostModel[] | undefined;

  thumbnail : string ="";
  
  faComments = faComments;
  constructor(private router: Router) {

  }


  ngOnInit(): void {
    console.info("ngOnInit of PostTileComponent");
  }

  goToPost(id: number): void {
    this.router.navigateByUrl('/view-post/' + id);
  }
}
