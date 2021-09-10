import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/shared/post.service';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from 'src/app/comment/comment.service';
import { PostModel } from 'src/app/shared/post-model';
import { CommentPayload } from 'src/app/comment/comment.payload';
import { throwIfEmpty } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { SubService } from 'src/app/sub/sub.service';
import { SubModel } from 'src/app/sub/sub-model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  username: string = "";
  
  /**
   * posts you have been posted
   */
  posts!: PostModel[];

  /**
   * Your favorite posts
   */
  myFavPosts !: PostModel[];
  

  /**
   * subscriptions
   */
  mySubs !: SubModel[];

  /**
   * comment you have been commented
   */
  comments!: CommentPayload[];
  
  /**
   * post count
   */
  postLength!: number;
  
  /**
   * comment counts
   */
  commentLength!: number;

  constructor(private route: ActivatedRoute, 
    private postService: PostService,
    private commentService: CommentService,
    private subService : SubService) {
    // ref https://angular.io/api/router/ActivatedRouteSnapshot
    this.username = this.route.snapshot.params.username;

    this.postService.getAllPostsByUser(this.username).subscribe(data => {
      this.posts = data;
      this.postLength = data.length;

    });

    this.postService.getMyFavoritePosts().subscribe(
      favpost =>{
          this.myFavPosts = favpost;
        }, error =>{
          console.error(" Error for getting favorite posts");
          throwError(error);
        }
    )

    this.subService.getSubscriptions().subscribe(
      sub =>{
        console.info("get subs");
        this.mySubs = sub;
      }, error =>{
        console.error("Error for trying to fetch subscriptions");
        throwError(error);
      }
    )
   
    this.commentService.getAllCommentsByUser(this.username).subscribe(data => {
      this.comments = data;
      this.commentLength = data.length;
    });
  }

  ngOnInit(): void{}
  
  findPostname(id:number): string|undefined{
    let p = this.posts.find(post => post.id === id);
    return p?.postname;
  }
}