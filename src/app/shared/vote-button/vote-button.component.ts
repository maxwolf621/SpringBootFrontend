import { Component, Input, OnInit } from '@angular/core';
import { PostModel } from '../post-model';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { VotePayload } from './vote-payload';
import { VoteType } from './vote-type';
import { VoteService } from '../vote.service';
import { AuthService } from 'src/app/auth/authservice/auth.service';
import { throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { PostService } from 'src/app/post/postservice/post.service';


/**
 * Down vote or Upload A Certain Post
 */
@Component({
  selector: 'app-vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.css']
})
export class VoteButtonComponent implements OnInit {

  /* Each Post has voteComponent */
  @Input('post') post!: PostModel;

  votePayload !: VotePayload;
  

  /* icon */
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  
  /* style binding */
  upvoteColor!: string;
  downvoteColor!: string;

  isLoggedIn!: boolean;

  private downvote!: any;
  private upvote!: any;

  /**
   * 
   * @param voteService Get Vote count and Do Voting
   * @param authService Require a authentication to vote a post 
   * @param postService Return post information
   * @param toastr (ngx-toastr) Notification 
   */
  constructor(private voteService: VoteService,
              private authService: AuthService,
              private postService: PostService, 
              private toastr: ToastrService) {

    this.authService.loggedIn.subscribe((data: boolean) => { 
      this.isLoggedIn = data });

    }
  /**
   * update Vote Details
   */
  ngOnInit(): void {
    console.info("------postId " + this.post.id);
    this.updateVoteDetails(this.post.id);
    this.votePayload = {
      voteType: 0,
      postId : this.post.id
    };
  }

  upvotePost() {
    console.info("Up vote this post");
    this.votePayload.voteType = VoteType.UPVOTE;
    this.DoVoting();
    this.downvoteColor = '';
  }

  downvotePost() {
    console.info("Down vote this post");
    this.votePayload.voteType = VoteType.DOWNVOTE;
    this.DoVoting();
    this.upvoteColor = '';
  }

  /**
   * To vote this Post
   */
  private DoVoting() {
    // Which post to vote
    this.votePayload.postId = this.post.id; 

    console.info("** POST ID " + this.votePayload.postId);
    console.info("** VOTE TYPE " +　this.votePayload.voteType);
    // Do voting and Subscribe `the response`
    this.voteService.VoteForPost(this.votePayload).subscribe(() => {
      this.updateVoteDetails(this.votePayload.postId);
    }, error => {
      this.toastr.error(error.error.message);
      throwError(error);
    });
  }

  /**
   * Refresh Certain Post (`api/post/getByPost/{postId}`)
   */
  private updateVoteDetails(postId:number) {
    console.info("updadteVoteDetails"+ postId);
    this.postService.getPostById(postId).subscribe(post => {
      console.info("update the post");
      this.post = post;
    }, error =>{
      console.error("Something Happen");
      throwError(error);
    }
    
    );
  }
}
