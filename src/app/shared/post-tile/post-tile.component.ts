import { Component, Input, OnInit } from '@angular/core';
import { PostModel } from '../post-model';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { PostService } from 'src/app/post/postservice/post.service';
import { throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/authservice/auth.service';

@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.css']
})
export class PostTileComponent implements OnInit {


  /**
   * base : home.component.ts
   */
  @Input() posts!: PostModel[];

  thumbnail : string ="";

  markedToggle!: boolean;
  
  faComments = faComments;


  constructor(private router: Router,
              private postService:PostService,
              private toastr : ToastrService,
              private authService: AuthService) {
  }


  ngOnInit(): void {}

  goToPost(id: number): void {
    this.router.navigateByUrl('/view-post/' + id);
  }

  markThePost(postId:number):void{
    this.postService.markThePost(postId).subscribe(
      ()=>{
        this.postService.getPostById(postId).subscribe(
          (post)=>{
            this.updatePost(postId, post);
            this.toastr.success("Post Is Marked");
          },(Error)=>{
            console.warn("Error" + Error );
          }
        )
      }, ()=>{
        console.warn("Error" + Error);
      }
    );
  }

  private updatePost(postId:number, updatedPost : PostModel){
    const updatePost = this.posts?.find(p => p.id === postId);
    if(updatePost){
      this.posts[ this.posts.indexOf(updatePost)] = updatedPost; 
    }
  }

}
