import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { CommentPayload } from 'src/app/comment/comment.payload';
import { CommentService } from 'src/app/comment/comment.service';
import { PostModel } from 'src/app/shared/post-model';
import { PostService } from 'src/app/shared/post.service';

/* 
 * A post will have 
 * comments
 */
@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {
  
  postId: any;
  post!: PostModel;
  comments!: CommentPayload[];
  commentForm: FormGroup;
  commentPayload: CommentPayload;

  constructor(private postService: PostService, private activateRoute: ActivatedRoute,
    private commentService: CommentService, private router: Router) {

    this.commentForm = new FormGroup({
      text: new FormControl('', Validators.required)
    });

    this.commentPayload = {
      text: "null",
      postId: this.postId
    };
  }

  ngOnInit(): void {
    this.postId = this.activateRoute.snapshot.params.postid;
    console.info("-----------get PostId" + this.postId);

    this.getPostById(this.postId);
    this.getCommentsForThisPost();
  }

  postComment() {
    this.commentPayload.text = this.commentForm.get('text')!.value;
    this.commentService.postComment(this.commentPayload).subscribe(data => {
      this.commentForm.get('commentText')!.setValue('');
    }, error => {
      throwError(error);
    })
  }

  private getPostById(postId:number) {
    this.postService.getPost(postId).subscribe(post => {
      this.post = post;
    }, error => {
      throwError(error);
    });
  }

  private getCommentsForThisPost() {
    this.commentService.getAllCommentsForPost(this.postId).subscribe(comment => {
      this.comments = comment;
    }, error => {
      throwError(error);
    });
  }

    // New features
    ReportComment() {
      console.info("1234");
    }
  
    HideComment() {
      console.info("54321");
    }

}