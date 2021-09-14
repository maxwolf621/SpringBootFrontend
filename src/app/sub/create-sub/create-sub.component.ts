import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { SubModel } from '../sub-model';
import { SubService } from '../subservice/sub.service';

@Component({
  selector: 'app-sub',
  templateUrl: './create-sub.component.html',
  styleUrls: ['./create-sub.component.css']
})
export class CreateSubComponent implements OnInit {

  sub!: SubModel;
  createSubForm!: FormGroup;
  constructor(private subService: SubService,
    private router: Router) { 
    this.sub = {
      id:-1,
      subname: '', 
      description: '',
      postsCount:-1
    };
  }

  ngOnInit(): void {
    this.createSubForm = new FormGroup({
      subname: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
  }

  createSub(){
    this.sub.subname = this.createSubForm.get('subname')?.value;
    this.sub.description = this.createSubForm.get('description')?.value;
    this.subService.createSub(this.sub).subscribe((result)=>{
      this.router.navigateByUrl('/list-subs');
    },(error) =>{
      throwError(error);
    });
  }
  discard(){
    this.router.navigateByUrl('/');
  }

}
