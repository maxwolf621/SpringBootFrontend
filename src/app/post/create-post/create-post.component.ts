import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { PostService } from 'src/app/shared/post.service';
import { SubModel } from 'src/app/sub/sub-model';
import { SubService } from 'src/app/sub/sub.service';
import { CreatePostPayload } from './create-post.pyload'

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  createPostForm!: FormGroup;
  postPayload!: CreatePostPayload;
  subs : SubModel[] = [];
  constructor(private postService: PostService, private router:Router,private subService: SubService) {
    this.postPayload = {
      postName: '',
      subName: '',
      url: '',
      description:''
    }
   }

  ngOnInit(): void {
    this.createPostForm = new FormGroup({
      postName: new FormControl('',Validators.required),
      subName : new FormControl(''),
      url     : new FormControl('',Validators.required),
      description: new FormControl('',Validators.required)
    });
    //
    this.subService.getAllSubs().subscribe((sub) =>{
      this.subs = sub;
    }, error =>{
      throwError(error);
    });
  }
  // <button (click) = 'createPost()'
  createPost() {
    this.postPayload.postName = this.createPostForm.get('postName')!.value;
    this.postPayload.subName = this.createPostForm.get('subName')!.value;
    this.postPayload.url = this.createPostForm.get('url')!.value;
    this.postPayload.description = this.createPostForm.get('description')!.value;

    this.postService.createPost(this.postPayload).subscribe((data) => {
      this.router.navigateByUrl('/');
    }, error => {
      throwError(error);
    })
  }

  discard(){
    this.router.navigateByUrl('/');
  }

}
