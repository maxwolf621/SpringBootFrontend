import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommentPayload } from 'src/app/comment/comment.payload';
import { CommentService } from 'src/app/comment/comment.service';

@Component({
  selector: 'app-comment-tile',
  templateUrl: './comment-tile.component.html',
  styleUrls: ['./comment-tile.component.css']
})
export class CommentTileComponent implements OnInit {

  @Input() comments !: CommentPayload[];
  @Input() postId !: number;

  // open the reply form
  isOpened : boolean = false;
  commentPayload!: CommentPayload;

  commentForm!: FormGroup;

  text : string = "";
  constructor(private router: Router, 
              private commentService : CommentService) {
  }

  ngOnInit(): void {  

    this.commentPayload ={
      text : "",
      postId : this.postId,
    }

    this.commentForm = new FormGroup({
      text : new FormControl('', Validators.required)
    })
    
  }

  toggle(){
    this.isOpened = !this.isOpened;
  }

  postComment(rootCommentId : any) {
    this.commentPayload.text = this.commentForm.get('text')?.value;
    this.commentPayload.repliedTo = rootCommentId;
    this.commentPayload.postId = this.postId;

    console.info("comment :" + this.commentPayload.text+
                 "\n post id :" + this.commentPayload.postId +
                 "\n replied to: " + this.commentPayload.repliedTo);

    this.commentService.postComment(this.commentPayload).subscribe(
      (data) => {
        console.info("Successfullye")
    }, error => {    
      console.warn("Error" + error)
    })

    window.location.reload();
  }

}
