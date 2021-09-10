import { Component, OnInit, ViewChild, TemplateRef, ViewContainerRef, ElementRef } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef, ScrollStrategyOptions } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  @ViewChild('overlayMenuList') overlayMenuList!: TemplateRef<any>;
  @ViewChild('originFab') originFab !: MatButton;

  overlayRef !: OverlayRef;

  constructor(private overlay: Overlay, private viewContainerRef: ViewContainerRef) {}

  ngOnInit(): void {
    const strategy = this.overlay.position().connectedTo(this.originFab._elementRef, { originX: 'end', originY: 'top' }, { overlayX: 'end', overlayY: 'bottom' });
  this.overlayRef = this.overlay.create({
    positionStrategy: strategy
  });
  }

  displayMenu() {
    if (this.overlayRef && this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    } else {
      this.overlayRef.attach(new TemplatePortal(this.overlayMenuList, this.viewContainerRef));
    }
  }
}