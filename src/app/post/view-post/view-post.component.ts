import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { CommentPayload } from 'src/app/comment/comment.payload';
import { CommentService } from 'src/app/comment/comment.service';
import { PostModel } from 'src/app/shared/post-model';
import { PostService } from '../postservice/post.service';

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
  
  postId!: number;
  post!: PostModel;

  comments!: CommentPayload[]; //display comments for this post
  
  commentPayload!: CommentPayload; //leave comment for this post

  commentForm!: FormGroup; // comment form

  constructor(private postService: PostService, 
              private activateRoute: ActivatedRoute,
              private commentService: CommentService, 
              private router: Router,
              private toastr : ToastrService) { 
  }

  ngOnInit(): void {
    this.postId = this.activateRoute.snapshot.params.id;

    // load the post content 
    this.getPostById(this.postId);


    this.commentService.getAllCommentsForPost(this.postId);

    //this.getCommentsForThisPost$();
    // get comment via the post
    this.getCommentsForThisPost();
    
    // initialize the form
    this.commentForm = new FormGroup({
      text : new FormControl('')
    })

    this.commentPayload = {
      postId: this.postId,
      text: ''
    }
  }

  /**
   * post the comment
   */
  postComment() {
    this.commentPayload.text = this.commentForm.get('text')!.value;
    console.info("comment :" + this.commentPayload.text +
                 "\npost id :" + this.commentPayload.postId);

    this.commentService.postComment(this.commentPayload).subscribe
    (
      newComment => {
        this.toastr.success("You left a comment");
        //console.info("New Comment" + newComment);
        //this.comments.push(newComment);
        this.commentService.getAllCommentsForPost(this.postId);
        //this.getCommentsForThisPost$();
    }, error => {
      throwError(error);
    })
  }

  
  private getPostById(postId:number) {
    this.postService.getPostById(postId).subscribe(post => {
      this.post = post;
    }, error => {
      throwError(error);
    });
  }

  
  // observable
  private getCommentsForThisPost$() {
    this.commentService.getAllCommentsForPost$(this.postId).subscribe(comment => {
      this.comments = comment;
      console.info("this comments"+ this.comments);
    }, error => {
      throwError(error);
    });
  }
  
  // behaviorSubject
  private getCommentsForThisPost(){
    this.commentService.allCommentsForPostObs.subscribe(
      (comments)  => {
        this.comments = comments;
      }
    )
  }

}