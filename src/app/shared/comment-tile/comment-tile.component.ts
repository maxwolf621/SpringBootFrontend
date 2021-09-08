<<<<<<< HEAD
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommentPayload } from 'src/app/comment/comment.payload';
=======
import { Component, OnInit } from '@angular/core';
>>>>>>> 16d04d84c7edae24a77f9e0157dea16273c2cad6

@Component({
  selector: 'app-comment-tile',
  templateUrl: './comment-tile.component.html',
  styleUrls: ['./comment-tile.component.css']
})
export class CommentTileComponent implements OnInit {

<<<<<<< HEAD

  @Input() comments : CommentPayload[] | undefined
  
  constructor(private router: Router) {}

  ngOnInit(): void {
    console.info("ngOnInit of CommentTileComponent");
=======
  constructor() { }

  ngOnInit(): void {
>>>>>>> 16d04d84c7edae24a77f9e0157dea16273c2cad6
  }

}
