import { Component, Input, OnInit } from '@angular/core';
import { PostModel } from '../post-model';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { VotePayload } from './vote-payload';
import { VoteType } from './vote-type';
import { VoteService } from '../vote.service';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { PostService } from '../post.service';
import { throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


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

  votePayload!: VotePayload;
  
  /* icon */
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  
  /* style binding */
  upvoteColor!: string;
  downvoteColor!: string;

  isLoggedIn!: boolean;

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
  }

  upvotePost() {
    let upvote = VoteType.UPVOTE;
    this.votePayload.voteType = upvote ;
    console.info("Up vote this post" + upvote);


    this.DoVoting();
    this.downvoteColor = '';
  }

  downvotePost() {
    let downvote = VoteType.DOWNVOTE;
    this.votePayload.voteType = downvote;
    console.info("Down vote this post" + downvote);

    this.DoVoting();

    this.upvoteColor = '';
  }

  /**
   * To vote this Post
   */
  private DoVoting() {
    // Which post to vote
    this.votePayload.postId = this.post.id;
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
    this.postService.getPostById(postId).subscribe(post => {
      console.info("update the post");
      this.post = post;
    }, error =>{
      throwError(error);
    }
    
    );
  }
}
