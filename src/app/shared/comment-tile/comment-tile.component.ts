import { Component, DoCheck, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommentPayload } from 'src/app/comment/comment.payload';
import { CommentService } from 'src/app/comment/comment.service';

@Component({
  selector: 'app-comment-tile',
  templateUrl: './comment-tile.component.html',
  styleUrls: ['./comment-tile.component.css']
})
export class CommentTileComponent implements OnInit, OnChanges, DoCheck {

  @Input() comments !: CommentPayload[];
  @Input() postId !: number;

  // open the reply form
  isOpened : boolean = false;

  commentPayload!: CommentPayload;
  commentForm!: FormGroup;
  
  constructor(private commentService : CommentService) {}


  ngOnInit(): void {  
    
    this.commentPayload ={
      text : "",
      postId : this.postId,
    }

    this.commentForm = new FormGroup({
      text : new FormControl('', Validators.required)
    })
    
  }

  ngOnChanges(){
    //console.info( "ngOnChanges" + this.comments.length);
  } 

  ngDoCheck(){
    //console.info( "ngDocheck" + this.comments.length);
  }

  toggle(){
    this.isOpened = !this.isOpened;

  }

  postComment(rootCommentId : any) {
    this.commentPayload.text = this.commentForm.get('text')?.value;
    this.commentPayload.repliedTo = rootCommentId;
    this.commentPayload.postId = this.postId;

    this.commentService.postComment(this.commentPayload).subscribe(
      (data) => {
        console.info("Replied Successfully")
        console.info(data);
    }, error => {    
      console.warn("Error" + error)
    })

    window.location.reload();
  }

}
