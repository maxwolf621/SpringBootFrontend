import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { SubModel } from 'src/app/sub/sub-model';
import { SubService } from 'src/app/sub/subservice/sub.service';
import { PostService } from '../postservice/post.service';
import { CreatePostPayload } from './create-post.payload'
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatDialogRef } from '@angular/material/dialog';
import { map,startWith,tap } from 'rxjs/operators';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';

interface PostTag{ // payload to our post controller backend
  postRequest: CreatePostPayload;
  tagNames : Array<string>;
}

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  createPostForm!: FormGroup;      // form to be filled from frontend
  postPayload!: CreatePostPayload; // payload to backed

  // create-post belongs which sub
  subs : SubModel[] = [];

  // keep listening to filter the desire keyword for use 
  tagCtrl = new FormControl();

  // filtered Tag for autoComplete()
  filteredTags !: Observable<string[]>

  // tags that user selected (tags for this post)
  selectedTags : Array<string> = [];
  
  // tags that database stored
  allTags : Array<string> = [];
  
  separatorKeysCodes : number[] = [ENTER, COMMA];

  removable = true;
  selectable = true;

  postTag !: PostTag;

    

  @ViewChild('tagsInput') tagsInput!: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete!: MatAutocomplete;


  constructor(private postService: PostService, 
              private router:Router,
              private subService: SubService,
              private matDialogRef: MatDialogRef<CreatePostComponent>) {
      
      this.postService.getTags().subscribe(
        (tagnames) =>{
          this.allTags = tagnames;
        }, error =>{
          throwError(error);
        }
      );
      
      this.filteredTags = this.tagCtrl.valueChanges.pipe(
        tap(data => console.info("data " + data)),
        startWith(null),
        map((tag : string | null) => tag ? this._filter(tag)  : this.allTags.slice()),
      )

      //initialize payload (data for backend )
      this.postPayload = {
        postname: '',
        subname: '',
        url: '',
        description:'',
    }
  }

  /**
   * initialize the control form
   * get the subs 
   */
  ngOnInit(): void {
    // initialize form (data for frontend)
    this.createPostForm = new FormGroup({
      postname: new FormControl('',Validators.required),
      subname : new FormControl(''),
      description: new FormControl('',Validators.required),
      url : new FormControl('')
    });

    // get all subs
    this.subService.getAllSubs().subscribe((sub) =>{
      this.subs = sub;
    }, error =>{
      throwError(error);
    });

  }

  /**
   * by clicking the button to create a new post
   */
  createPost() {
    this.postPayload.postname = this.createPostForm.get('postname')!.value;
    this.postPayload.subname = this.createPostForm.get('subname')!.value;
    this.postPayload.url = this.createPostForm.get('url')!.value;
    this.postPayload.description = this.createPostForm.get('description')!.value;

    console.info("post name: " + this.postPayload.postname + 
                 "\n description: " + this.postPayload.description + 
                 "\n url "+ this.postPayload.url + 
                 "\n sub name " + this.postPayload.subname);

    this.postTag = {
      postRequest : this.postPayload , 
      tagNames : this.selectedTags
    }

    this.postService.createPost(this.postTag).subscribe
    (
      () => {
        window.location.reload();
    }, error => {
      console.warn("Error");
      throwError(error);
    })
    this.matDialogRef.close();
  }


  /**
   * remove Tag in selectedTags
   * @param tagname tag needs to be deleted
   */
  removeTag(tagname:string){

    //this.selectedTags = this.selectedTags.filter(tag => tag !== tagname);
    
    const index = this.selectedTags.indexOf(tagname);

    if (index >= 0) {
      // delete tag
      this.selectedTags.splice(index, 1);
    }
  }

  /**
   * add new tag to selectedTags[] via user-input
   * @param $event tag the user inputs
   */
  addTag($event: MatChipInputEvent) {
    console.info("Tag Event" + $event.value);
    
    const input = $event.input;
    const value = $event.value;

    if ((value || '').trim()) {
      // if duplicate tagname in the array
      if (this.selectedTags.indexOf(value) === -1) {
        this.selectedTags.push(value);
      }
    }

    // clear the text in tag-input-bar
    if(input){
      input.value = ''
    }

    this.tagCtrl.setValue(null);
  }

  
  /**
   * Select value from selected-bar
   */
  selected($event:MatAutocompleteSelectedEvent):void{
    
    // check the duplicate if it exists in filter tag
    let index = this.selectedTags.indexOf($event.option.viewValue);
    
    if(index === -1){
      this.selectedTags.push($event.option.viewValue);
    }
    
    console.info("tagCtrl now :" +  this.tagCtrl.value);

    // choose value from selected-list not the value you type 
    this.tagsInput.nativeElement.value = '';

    this.tagCtrl.setValue(null);
  }

  /**
   * 
   * @param tagname tagname we input
   * return tags that match our tagname
   */
  private _filter(tagname: string): string[]{
    // toLowerCase()  : normalize 
    const normalizedTagname =  tagname.toLowerCase();
    // filter the allTags with normalizedTagname
    return this.allTags.filter( filterTag =>　filterTag.toLowerCase().includes(normalizedTagname));
  }
}

