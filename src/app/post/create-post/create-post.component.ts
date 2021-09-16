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
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  createPostForm!: FormGroup;
  postPayload!: CreatePostPayload;

  // create-post belongs which sub
  subs : SubModel[] = [];

  tagCtrl = new FormControl();

  // filtered Tag for autoComplete()
  filteredTags !: Observable<string[]>

  // tags that user selected (tags for this post)
  selectedTags : Array<string> = ['post'];
  
  // tags that database stored
  allTags = ['Feel Weird', 'Es gibt keine dummen Fragen', 'Changes', 'Space'];
  
  separatorKeysCodes = [ENTER, COMMA];

  removable = true;
  selectable = true;

  @ViewChild('tagsInput') tagsInput!: ElementRef<HTMLInputElement>;


  constructor(private postService: PostService, 
              private router:Router,
              private subService: SubService,
              private matDialogRef: MatDialogRef<CreatePostComponent>) {
      this.filteredTags = this.tagCtrl.valueChanges.pipe(
        tap(data => console.info("data " + data)),
        startWith(''),
        map((tag : string | null) => tag ? this._filter(tag)  : this.allTags.slice()),
      )
  }

  /**
   * initialize the control form
   * get the subs 
   */
  ngOnInit(): void {
    this.createPostForm = new FormGroup({
      postName: new FormControl('',Validators.required),
      subName : new FormControl(null),
      url     : new FormControl(''),
      description: new FormControl('',Validators.required),
    });
    //initialize 
    this.postPayload = {
      postName: '',
      subName: '',
      url: '',
      description:''
    }
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
    this.postPayload.postName = this.createPostForm.get('postName')!.value;
    this.postPayload.subName = this.createPostForm.get('subName')!.value;
    this.postPayload.url = this.createPostForm.get('url')!.value;
    this.postPayload.description = this.createPostForm.get('description')!.value;

    this.postService.createPost(this.postPayload).subscribe((data) => {
      this.router.navigateByUrl('/');
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

    this.selectedTags = this.selectedTags.filter(tag => tag !== tagname);
    /**
     *    
    // find the 
    const index = this.tags.indexOf(tagname);
    // found it => delete it 
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
     */
  }

  /**
   * add new tag to selectedTags[]
   * @param $event tag the user inputs
   */
  addTag($event: MatChipInputEvent) {
    console.info("Tag Event" + $event);
    
    if (($event.value || '').trim()) {
      const value = $event.value.trim();

      // if duplicate tagname in the array
      if (this.selectedTags.indexOf(value) === -1) {
        this.selectedTags.push(value);
      }
    }

    $event.input.value = '';
    this.tagCtrl.setValue(null);
  }

  selected($event:MatAutocompleteSelectedEvent):void{
    // add the event `option` from DOM in selectedTags[]
    this.selectedTags.push($event.option.viewValue);
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

