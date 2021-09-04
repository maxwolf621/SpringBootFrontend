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

  constructor(private postService: PostService) {
  }

  ngOnInit(): void {
    this.postService.getAllPost().subscribe(post=>{
      this.posts = post;
    });
  }
}
