import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommentPayload } from 'src/app/comment/comment.payload';

@Component({
  selector: 'app-comment-tile',
  templateUrl: './comment-tile.component.html',
  styleUrls: ['./comment-tile.component.css']
})
export class CommentTileComponent implements OnInit {


  @Input() comments !: CommentPayload[] 

  isOpened : boolean = false;
  
  constructor(private router: Router) {}

  ngOnInit(): void {
    console.info("opened? :" + this.isOpened);
  }

  open(){
    this.isOpened = !this.isOpened;
  }

}
