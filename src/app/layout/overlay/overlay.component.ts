import { Component, ElementRef, OnInit, ViewChild,  } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';

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

  constructor(private overlay: Overlay) {}

  ngOnInit() {
    console.info("trigger on" + this.trigger);
    console.info("is open?" + this.isOpen);
  }
}
