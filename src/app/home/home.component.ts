import { Component, OnInit } from '@angular/core';
import { PostService } from '../post/postservice/post.service';
import { PostModel } from '../shared/post-model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
}) 
export class HomeComponent implements OnInit {

  // To pass to post tile
  posts: Array<PostModel> =[];
  
  hotposts :Array<PostModel> = [];
  
  readonly linkpreviewProvider = "https://api.linkpreview.net/?key=44fd0848d4bb42f9fc43e09cae56f0b3&q=";
  
  image: string = "";
  constructor(private postService: PostService) {
  }

  /**
   * Fetch All Posts
   */
  ngOnInit(): void {
    this.postService.getAllPost().subscribe(post=>{
      this.posts = post;
      this.posts.forEach(val => this.hotposts.push(Object.assign({}, val)));
      this.hotposts.sort((a,b) => a.voteCount < b.voteCount ? 1 : -1);
    }); 
    

    this.postService.getimagepreview(`https://api.linkpreview.net/?key=44fd0848d4bb42f9fc43e09cae56f0b3&q=https://google.com/`).subscribe(
      thumbnail =>{ 
        console.info("getimage" + thumbnail.image);
        this.image = thumbnail.image
      },
      error =>{
        console.warn("ERROR" + error);
      });
    
  }
}
