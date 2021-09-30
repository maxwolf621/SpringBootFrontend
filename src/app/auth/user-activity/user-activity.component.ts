import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from 'src/app/comment/comment.service';
import { PostModel } from 'src/app/shared/post-model';
import { CommentPayload } from 'src/app/comment/comment.payload';
//import { throwIfEmpty } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { SubService } from 'src/app/sub/subservice/sub.service';
import { SubModel } from 'src/app/sub/sub-model';
import { PostService } from 'src/app/post/postservice/post.service';
import { User } from '../user';


@Component({
  selector: 'app-user-activity',
  templateUrl: './user-activity.component.html',
  styleUrls: ['./user-activity.component.scss']
})
export class UserActivityComponent implements OnInit {
  
  
  username: string = "";
  posts!: PostModel[]; // post you have been posted
  myFavPosts !: PostModel[]; // Your favorite posts
  mySubs !: SubModel[]; // Your subscriptions
  comments!: CommentPayload[];  //comment you have been commented
  postLength!: number; //post count
  commentLength!: number; // comment counts

  constructor(private route: ActivatedRoute, 
    private postService: PostService,
    private commentService: CommentService,
    private subService : SubService) 
  {

    this.username = this.route.snapshot.params.username;
    console.info("get username fro url " + this.username);

    this.postService.getAllPostsByUser(this.username).subscribe(posts => {
      this.posts = posts;
      this.postLength = posts.length;

    });

    this.postService.getMyFavoritePosts().subscribe(
      favPosts =>{
          this.myFavPosts = favPosts;
        }, error =>{
          console.error(" Error for fetching favorite posts");
          throwError(error);
        }
    )

    this.subService.getSubscriptions().subscribe(
      sub =>{
        this.mySubs = sub;
      }, error =>{
        console.error("Error for trying to fetch subscriptions");
        throwError(error);
      }
    )
   
    this.commentService.getAllCommentsByUser(this.username).subscribe(comments => {
      this.comments = comments;
      this.commentLength = comments.length;
    });
  }

  ngOnInit(): void{}
  
  findPostName(id:number): string|undefined{
    let p = this.posts.find(post => post.id === id);
    return p?.postname;
  }

}
