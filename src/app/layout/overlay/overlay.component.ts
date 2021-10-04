import { Component, ElementRef, OnInit, ViewChild,  } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreatePostComponent } from 'src/app/post/create-post/create-post.component';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent implements OnInit {

  isOpen = false;  
  yes = true;
  
  @ViewChild('trigger') trigger !: ElementRef;

  overlayRef!: OverlayRef;

  constructor(private overlay: Overlay,
    private matDialog: MatDialog) {}

  ngOnInit() {
    console.info("trigger on" + this.trigger);
    console.info("is open?" + this.isOpen);
  }

  openDialog(){
    this.matDialog.open(CreatePostComponent,{
      width: '500px',
    });
  }
}
