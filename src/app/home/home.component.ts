import { Component, OnInit } from '@angular/core';
import { PostModel } from '../shared/post-model';
import { PostService } from '../shared/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // To pass to post tile
  posts: Array<PostModel> =[];
<<<<<<< HEAD

  constructor(private postService: PostService) {
  }

  /**
   * Fetch All Posts
   */
  ngOnInit(): void {
    this.postService.getAllPost().subscribe(post=>{
      this.posts = post;
    });
  }
=======
  constructor(private postService: PostService) {
    postService.getAllPost().subscribe(post=>{
      this.posts = post;
    });
  }

  ngOnInit(): void {
  }

>>>>>>> 16d04d84c7edae24a77f9e0157dea16273c2cad6
}
