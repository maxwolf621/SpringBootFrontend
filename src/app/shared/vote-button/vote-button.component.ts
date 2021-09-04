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
 * Donwvote or Upload A Certain Post
 */
@Component({
  selector: 'app-vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.css']
})
export class VoteButtonComponent implements OnInit {

  /* Each Post has voteComponent */
  @Input() post!: PostModel;

  votePayload!: VotePayload;
  
  /* icon */
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  
  /* sytle binding */
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
    this.updateVoteDetails();
  }


  upvotePost() {
    this.votePayload.voteType = VoteType.UPVOTE;
    this.vote();

    this.downvoteColor = '';
  }

  downvotePost() {
    this.votePayload.voteType = VoteType.DOWNVOTE;
    this.vote();

    this.upvoteColor = '';
  }

  /**
   * To vote this Post
   */
  private vote() {
    // Which post to vote
    this.votePayload.postId = this.post.id;
    // Do voting and Subscribe `the response`
    this.voteService.VoteForPost(this.votePayload).subscribe(() => {
      this.updateVoteDetails();
    }, error => {
      this.toastr.error(error.error.message);
      throwError(error);
    });
  }

  /**
   * Refresh Certain Post 
   * api/post/getByPost/pistid
   */
  private updateVoteDetails() {
    this.postService.getPost(this.post.id).subscribe(postarr => {
      this.post = postarr;
    });
  }
}
