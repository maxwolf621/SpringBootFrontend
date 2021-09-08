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
  
<<<<<<< HEAD
  postId!: number ;
  post!: PostModel;

  /**
   * display comments
   */
  comments!: CommentPayload[];
  
  /**
   * To post　a comment
   */
=======
  postId: number;
  post!: PostModel;
  comments!: CommentPayload[];
>>>>>>> 16d04d84c7edae24a77f9e0157dea16273c2cad6
  commentForm: FormGroup;
  commentPayload: CommentPayload;

  constructor(private postService: PostService, private activateRoute: ActivatedRoute,
    private commentService: CommentService, private router: Router) {
<<<<<<< HEAD
=======
    this.postId = this.activateRoute.snapshot.params.id;
>>>>>>> 16d04d84c7edae24a77f9e0157dea16273c2cad6

    this.commentForm = new FormGroup({
      text: new FormControl('', Validators.required)
    });
<<<<<<< HEAD

    this.commentPayload = {
      text: "null",
=======
    this.commentPayload = {
      commentText: '',
>>>>>>> 16d04d84c7edae24a77f9e0157dea16273c2cad6
      postId: this.postId
    };
  }

  ngOnInit(): void {
<<<<<<< HEAD
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
=======
    this.getPostById();
    this.getCommentsForThisPost();
  }

  postComment() {
    this.commentPayload.commentText = this.commentForm.get('text')!.value;
    this.commentService.postComment(this.commentPayload).subscribe(data => {
      this.commentForm.get('commentText')!.setValue('');
      this.getCommentsForThisPost();
>>>>>>> 16d04d84c7edae24a77f9e0157dea16273c2cad6
    }, error => {
      throwError(error);
    })
  }

<<<<<<< HEAD
  
  private getPostById(postId:number) {
    this.postService.getPostById(postId).subscribe(post => {
=======
  private getPostById() {
    this.postService.getPost(this.postId).subscribe(post => {
>>>>>>> 16d04d84c7edae24a77f9e0157dea16273c2cad6
      this.post = post;
    }, error => {
      throwError(error);
    });
  }

<<<<<<< HEAD
  /**
   * display comments of this post
   */
  private getCommentsForThisPost() {
    this.commentService.getAllCommentsForPost(this.postId).subscribe(comment => {
      console.info(comment);
=======
  private getCommentsForThisPost() {
    this.commentService.getAllCommentsForPost(this.postId).subscribe(comment => {
>>>>>>> 16d04d84c7edae24a77f9e0157dea16273c2cad6
      this.comments = comment;
    }, error => {
      throwError(error);
    });
  }

<<<<<<< HEAD
    // New features
    ReportComment() {
      console.info("1234");
    }
  
    HideComment() {
      console.info("54321");
    }

=======
>>>>>>> 16d04d84c7edae24a77f9e0157dea16273c2cad6
}