import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/shared/post.service';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from 'src/app/comment/comment.service';
import { PostModel } from 'src/app/shared/post-model';
import { CommentPayload } from 'src/app/comment/comment.payload';
<<<<<<< HEAD
import { throwIfEmpty } from 'rxjs/operators';
=======
>>>>>>> 16d04d84c7edae24a77f9e0157dea16273c2cad6

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
<<<<<<< HEAD

  username: string = "";
  
  /**
   * posts you have been posted
   */
  posts!: PostModel[];
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
=======
  name: string;
  posts!: PostModel[];
  comments!: CommentPayload[];
  postLength!: number;
>>>>>>> 16d04d84c7edae24a77f9e0157dea16273c2cad6
  commentLength!: number;

  constructor(private route: ActivatedRoute, private postService: PostService,
    private commentService: CommentService) {
    // ref https://angular.io/api/router/ActivatedRouteSnapshot
<<<<<<< HEAD
    this.username = this.route.snapshot.params.username;

    this.postService.getAllPostsByUser(this.username).subscribe(data => {
      this.posts = data;
      this.postLength = data.length;
    });

    this.commentService.getAllCommentsByUser(this.username).subscribe(data => {
      this.comments = data;
      this.commentLength = data.length;
    });

  }

  ngOnInit(): void {}
=======
    this.name = this.route.snapshot.params.name;

    this.postService.getAllPostsByUser(this.name).subscribe(data => {
      this.posts = data;
      this.postLength = data.length;
    });
    this.commentService.getAllCommentsByUser(this.name).subscribe(data => {
      this.comments = data;
      this.commentLength = data.length;
    });
  }

  ngOnInit(): void {
  }

>>>>>>> 16d04d84c7edae24a77f9e0157dea16273c2cad6
}