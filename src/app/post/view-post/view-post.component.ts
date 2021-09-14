import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  
  postId!: number ;
  post!: PostModel;
  /**
   * display comments
   */
  comments!: CommentPayload[];
  
  /**
   * To post　a comment
   */
  commentForm: FormGroup;
  commentPayload: CommentPayload;

  constructor(private postService: PostService, private activateRoute: ActivatedRoute,
    private commentService: CommentService, private router: Router) {

    this.commentForm = new FormGroup({
      text: new FormControl('', Validators.required)
    });

    this.commentPayload = {
      text: "",
      postId: this.postId
    };
  }

  ngOnInit(): void {
    this.postId = this.activateRoute.snapshot.params.postId;

    console.info("-----------get PostId " + this.postId);
    this.getPostById(this.postId);
    this.getCommentsForThisPost();
  }

  /**
   * post the comment
   */
  postComment() {
    this.commentPayload.text = this.commentForm.get('text')!.value;
    this.commentPayload.postId = this.postId;
    this.commentService.postComment(this.commentPayload).subscribe(data => {
      console.info(data);
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

  /**
   * display comments of this post
   */
  private getCommentsForThisPost() {
    this.commentService.getAllCommentsForPost(this.postId).subscribe(comment => {
      console.info(comment);
      this.comments = comment;
      return this.comments;
    }, error => {
      throwError(error);
    });
  }
}