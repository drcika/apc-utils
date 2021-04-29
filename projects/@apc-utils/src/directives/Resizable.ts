import { Directive, Input, OnInit, Output, ElementRef, EventEmitter } from '@angular/core';

// ovo se koristi za resize panela
@Directive({ selector: '[appResizable]' })
export class ApcResizable implements OnInit {

  @Output() readonly appResizable = new EventEmitter<any>();

  @Input() resizableGrabWidth = 6;
  @Input() resizableMinWidth = 300;
  @Input() resizableMaxWidth = 700;
  @Input() left = 0;
  @Input() panel: any;

  dragging = false;

  constructor(private el: ElementRef) {

    function preventGlobalMouseEvents() {
      document.body.style['pointer-events'] = 'none';
    }
    // overflow-y: auto;
    // overflow-x: hidden;
    function restoreGlobalMouseEvents() {
      document.body.style['pointer-events'] = 'auto';
    }

    const newWidth = (wid) => {
      const newWidth = Math.min(Math.max(this.resizableMinWidth, wid), this.resizableMaxWidth);
      el.nativeElement.style.width = (newWidth) + "px";
      return newWidth
    }


    const mouseMoveG = (evt) => {
      if (!this.dragging) {
        return;
      }
      const width = newWidth(evt.clientX - el.nativeElement.offsetLeft - this.left);
      this.appResizable.emit({ width })
      evt.stopPropagation();
    };

    // const dragMoveG = (evt) => {
    //   if (!this.dragging) {
    //     return;
    //   }
    //   const newWidth = Math.max(this.resizableMinWidth, (evt.clientX - el.nativeElement.offsetLeft)) + "px";
    //   el.nativeElement.style.width = (evt.clientX - el.nativeElement.offsetLeft) + "px";
    //   evt.stopPropagation();
    // };

    const mouseUpG = (evt) => {
      if (!this.dragging) {
        return;
      }
      restoreGlobalMouseEvents();
      this.dragging = false;
      evt.stopPropagation();
    };

    const mouseDown = (evt: MouseEvent) => {
      if (this.inDragRegion(evt)) {
        this.dragging = true;
        preventGlobalMouseEvents();
        evt.stopPropagation();
      }
    };


    const mouseMove = (evt) => {
      if (this.inDragRegion(evt) || this.dragging) {
        el.nativeElement.style.cursor = "col-resize";
        // el.nativeElement.style["overflow-y"] = 'hidden';
      }
      else {
        el.nativeElement.style.cursor = "default";
        // el.nativeElement.style["overflow-y"] = 'auto';
      }
    }


    document.addEventListener('mousemove', mouseMoveG, true);
    document.addEventListener('mouseup', mouseUpG, true);
    el.nativeElement.addEventListener('mousedown', mouseDown, true);
    el.nativeElement.addEventListener('mousemove', mouseMove, true);
  }

  ngOnInit(): void {
    // this.el.nativeElement.style["border-right"] = this.resizableGrabWidth + "px solid";
  }

  inDragRegion(evt) {
    if (this.panel.state.context) {
      return false;
    }
    return this.el.nativeElement.clientWidth - evt.clientX + this.el.nativeElement.offsetLeft + this.left < this.resizableGrabWidth;
  }

}