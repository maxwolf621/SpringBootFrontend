import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommentPayload } from 'src/app/comment/comment.payload';

@Component({
  selector: 'app-comment-tile',
  templateUrl: './comment-tile.component.html',
  styleUrls: ['./comment-tile.component.css']
})
export class CommentTileComponent implements OnInit {


  @Input() comments : CommentPayload[] | undefined
  
  constructor(private router: Router) {}

  ngOnInit(): void {
    console.info("ngOnInit of CommentTileComponent");
  }

}
