import { Component, ElementRef, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef,  } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent implements OnInit {

  isOpen = false;

  @ViewChild('cdkConnectedOverlay') cdkConnectedOverlay!: TemplateRef<any>; 
  @ViewChild('trigger') trigger !: ElementRef;
  overlayRef!: OverlayRef;

  constructor(private overlay: Overlay, private viewContainerRef: ViewContainerRef) {}

  ngOnInit() {
    const strategy = this.overlay.position()
                          .flexibleConnectedTo(this.trigger)
                          .withPositions([{ originX: 'end', originY: 'bottom', overlayX: 'center', overlayY: 'top' }]);
    const config = new OverlayConfig({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      positionStrategy: strategy,
    });
    this.overlayRef = this.overlay.create(config);
  }
  
  displayMenu() {
    if (this.overlayRef && this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    } else {
      this.overlayRef.attach(new TemplatePortal(this.cdkConnectedOverlay, this.viewContainerRef));
    }
  }  
}
